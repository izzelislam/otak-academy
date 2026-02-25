<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\DownloadableAsset;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of purchased/accessible assets for the member.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get paid assets that user has purchased successfully
        $purchasedAssetIds = Payment::where('user_id', $user->id)
            ->where('payable_type', DownloadableAsset::class)
            ->where('status', 'paid')
            ->pluck('payable_id')
            ->toArray();

        // Also get free assets that user has redeemed
        $redeemedAssetIds = $user->assetCodes()
            ->where('is_used', true)
            ->pluck('asset_id')
            ->toArray();

        $accessibleAssetIds = array_unique(array_merge($purchasedAssetIds, $redeemedAssetIds));

        $assets = DownloadableAsset::whereIn('id', $accessibleAssetIds)
            ->where('is_published', true)
            ->with(['assetCodes' => function ($query) use ($user) {
                $query->where('user_id', $user->id)->where('is_used', true);
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        $assetCodeService = app(\App\Services\AssetCodeService::class);
        
        $assets->transform(function ($asset) use ($assetCodeService) {
            $code = $asset->assetCodes->first();
            if ($code) {
                $asset->eligibility = $assetCodeService->checkRedownloadEligibility($code);
            }
            return $asset;
        });

        return Inertia::render('Member/Assets/Index', [
            'assets' => $assets,
        ]);
    }
}
