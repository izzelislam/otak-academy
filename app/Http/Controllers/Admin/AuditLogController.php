<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DownloadableAsset;
use App\Models\DownloadAuditLog;
use App\Models\User;
use App\Services\DownloadAuditService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AuditLogController extends Controller
{
    public function __construct(
        protected DownloadAuditService $auditService
    ) {}

    /**
     * Display a listing of audit logs with filtering.
     */
    public function index(Request $request): InertiaResponse
    {
        $filters = [
            'ip_address' => $request->input('ip_address'),
            'action' => $request->input('action'),
            'result' => $request->input('result'),
            'is_suspicious' => $request->boolean('is_suspicious'),
            'asset_id' => $request->input('asset_id'),
            'user_id' => $request->input('user_id'),
            'from_date' => $request->input('from_date'),
            'to_date' => $request->input('to_date'),
        ];

        // Remove empty filters
        $filters = array_filter($filters, fn($value) => $value !== null && $value !== '');

        $logs = $this->auditService->getLogs($filters, 25);

        // Get filter options
        $assets = DownloadableAsset::select('id', 'title')->orderBy('title')->get();
        $users = User::select('id', 'name')->orderBy('name')->get();

        $actionTypes = [
            DownloadAuditLog::ACTION_CODE_ATTEMPT => 'Code Attempt',
            DownloadAuditLog::ACTION_CODE_SUCCESS => 'Code Success',
            DownloadAuditLog::ACTION_DOWNLOAD_REQUEST => 'Download Request',
            DownloadAuditLog::ACTION_DOWNLOAD_COMPLETE => 'Download Complete',
            'code_generation' => 'Code Generation',
            'code_export' => 'Code Export',
        ];

        $resultTypes = [
            DownloadAuditLog::RESULT_SUCCESS => 'Success',
            DownloadAuditLog::RESULT_FAILED => 'Failed',
            DownloadAuditLog::RESULT_BLOCKED => 'Blocked',
        ];

        return Inertia::render('Admin/AuditLogs/Index', [
            'logs' => $logs,
            'filters' => $filters,
            'assets' => $assets,
            'users' => $users,
            'actionTypes' => $actionTypes,
            'resultTypes' => $resultTypes,
        ]);
    }

    /**
     * Display flagged/suspicious activities.
     */
    public function flagged(Request $request): InertiaResponse
    {
        $logs = $this->auditService->getFlaggedLogs(25);
        $suspiciousIps = $this->auditService->getSuspiciousIps(24);

        return Inertia::render('Admin/AuditLogs/Flagged', [
            'logs' => $logs,
            'suspiciousIps' => $suspiciousIps,
        ]);
    }
}
