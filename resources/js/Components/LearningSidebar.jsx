import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function LearningSidebar({ 
    course, 
    sessions, 
    currentMaterialId, 
    userProgress = {},
    onMaterialClick 
}) {
    const [expandedSessions, setExpandedSessions] = useState(() => {
        // Auto-expand session that contains current material
        const sessionWithCurrent = sessions.find(session => 
            session.materials?.some(material => material.id === currentMaterialId)
        );
        return sessionWithCurrent ? { [sessionWithCurrent.id]: true } : {};
    });

    // Helper to check if a material is completed
    const isMaterialCompleted = (materialId) => {
        return userProgress[materialId]?.is_completed === true;
    };

    // Flatten all materials for sequential access check
    const getAllMaterials = () => {
        const materials = [];
        sessions.forEach(session => {
            session.materials?.forEach(material => {
                materials.push(material);
            });
        });
        return materials;
    };

    const allMaterials = getAllMaterials();

    // Check if material is accessible based on sequential order
    const canAccessMaterial = (materialId) => {
        const materialIndex = allMaterials.findIndex(m => m.id === materialId);
        if (materialIndex === 0) return true;
        
        // Check if all previous materials are completed
        for (let i = 0; i < materialIndex; i++) {
            if (!isMaterialCompleted(allMaterials[i].id)) {
                return false;
            }
        }
        return true;
    };

    // Toggle session expansion
    const toggleSession = (sessionId) => {
        setExpandedSessions(prev => ({
            ...prev,
            [sessionId]: !prev[sessionId]
        }));
    };

    // Calculate session progress
    const getSessionProgress = (session) => {
        if (!session.materials || session.materials.length === 0) return 0;
        const completedCount = session.materials.filter(material => 
            isMaterialCompleted(material.id)
        ).length;
        return Math.round((completedCount / session.materials.length) * 100);
    };

    // Get session status
    const getSessionStatus = (session) => {
        const progress = getSessionProgress(session);
        if (progress === 100) return 'completed';
        if (progress > 0) return 'in-progress';
        return 'not-started';
    };

    const overallProgress = allMaterials.length > 0 
        ? Math.round((allMaterials.filter(m => isMaterialCompleted(m.id)).length / allMaterials.length) * 100)
        : 0;

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300 font-sans">
            {/* Course Header */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                {/* Course Thumbnail */}
                <div className="flex items-start gap-3 mb-4">
                    {course.thumbnail ? (
                        <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#10a37f] to-emerald-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-lg">
                                {course.title?.charAt(0)?.toUpperCase() || 'C'}
                            </span>
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[14px] leading-tight text-gray-900 dark:text-white line-clamp-2">
                            {course.title}
                        </h3>
                        <p className="text-[12px] text-gray-500 dark:text-slate-400 mt-1">
                            {sessions.length} sessions • {allMaterials.length} materials
                        </p>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] text-gray-500 dark:text-slate-400">Progress</span>
                        <span className="text-[12px] font-medium text-[#10a37f]">
                            {overallProgress}%
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#10a37f] transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${overallProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto learning-sidebar">
                {sessions.map((session, sessionIndex) => {
                    const isExpanded = expandedSessions[session.id];
                    const sessionProgress = getSessionProgress(session);
                    const sessionStatus = getSessionStatus(session);
                    const hasCurrentMaterial = session.materials?.some(m => m.id === currentMaterialId);

                    return (
                        <div key={session.id} className="border-b border-gray-200 dark:border-slate-800 last:border-b-0">
                            {/* Session Header */}
                            <button
                                onClick={() => toggleSession(session.id)}
                                className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ${
                                    hasCurrentMaterial ? 'bg-gray-100/50 dark:bg-slate-800/50' : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Session Number */}
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${
                                        sessionStatus === 'completed' 
                                            ? 'bg-[#10a37f] text-white'
                                            : sessionStatus === 'in-progress'
                                            ? 'bg-[#10a37f]/20 text-[#10a37f]'
                                            : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
                                    }`}>
                                        {sessionStatus === 'completed' ? (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            sessionIndex + 1
                                        )}
                                    </div>

                                    {/* Session Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[13px] font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {session.title}
                                            </h4>
                                            {/* Chevron */}
                                            <svg 
                                                className={`w-4 h-4 text-gray-400 dark:text-slate-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
                                                    isExpanded ? 'rotate-180' : ''
                                                }`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[11px] text-gray-500 dark:text-slate-400">
                                                {session.materials?.length || 0} materials
                                            </span>
                                            {sessionProgress > 0 && sessionProgress < 100 && (
                                                <span className="text-[11px] text-[#10a37f] font-medium">
                                                    {sessionProgress}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* Materials List */}
                            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
                                isExpanded ? 'max-h-[1000px]' : 'max-h-0'
                            }`}>
                                <div className="pb-2">
                                    {session.materials?.map((material) => {
                                        const isCompleted = isMaterialCompleted(material.id);
                                        const isAccessible = canAccessMaterial(material.id);
                                        const isCurrent = material.id === currentMaterialId;

                                        return (
                                            <div key={material.id}>
                                                {isAccessible ? (
                                                    <Link
                                                        href={route('member.courses.materials.show', [course.id, material.id])}
                                                        className={`flex items-center gap-3 px-4 py-2.5 pl-10 text-[13px] transition-colors ${
                                                            isCurrent
                                                                ? 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]'
                                                                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                                        }`}
                                                        onClick={(e) => {
                                                            if (onMaterialClick) {
                                                                e.preventDefault();
                                                                onMaterialClick(material.id);
                                                            }
                                                        }}
                                                    >
                                                        {/* Status Icon */}
                                                        <div className="flex-shrink-0">
                                                            {isCompleted ? (
                                                                <div className="w-5 h-5 rounded-full bg-[#10a37f] flex items-center justify-center">
                                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                            ) : isCurrent ? (
                                                                <div className="w-5 h-5 rounded-full border-2 border-[#10a37f] flex items-center justify-center">
                                                                    <div className="w-2 h-2 bg-[#10a37f] rounded-full" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-slate-600" />
                                                            )}
                                                        </div>
                                                        
                                                        {/* Material Title */}
                                                        <span className={`flex-1 line-clamp-1 ${isCurrent ? 'font-medium' : ''}`}>
                                                            {material.title}
                                                        </span>

                                                        {/* Type Badge */}
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${getTypeBadgeClass(material.type)}`}>
                                                            {material.type.toUpperCase()}
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <div className="flex items-center gap-3 px-4 py-2.5 pl-10 text-[13px] text-gray-400 dark:text-slate-500 cursor-not-allowed">
                                                        {/* Lock Icon */}
                                                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </div>
                                                        
                                                        <span className="flex-1 line-clamp-1">{material.title}</span>

                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 font-medium flex-shrink-0">
                                                            {material.type.toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Helper function for type badge classes
function getTypeBadgeClass(type) {
    switch (type) {
        case 'video':
            return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
        case 'text':
            return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
        case 'pdf':
            return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
        case 'ebook':
            return 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]';
        case 'gmeet':
            return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
        default:
            return 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400';
    }
}
