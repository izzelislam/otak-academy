import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function LearningSidebar({ 
    course, 
    sessions, 
    currentSubMaterialId,
    currentMaterialId,
    userProgress = {},
    onSubMaterialClick 
}) {
    const getAllSubMaterials = () => {
        const subs = [];
        sessions.forEach(session => {
            session.materials?.forEach(material => {
                material.sub_materials?.forEach(sub => {
                    subs.push({ ...sub, materialTitle: material.title });
                });
            });
        });
        return subs;
    };

    const allSubMaterials = getAllSubMaterials();
    const allMaterials = sessions.flatMap(s => s.materials || []);

    const isSubMaterialCompleted = (subId) => {
        return userProgress[subId]?.is_completed === true;
    };

    const canAccessSubMaterial = (subId) => {
        const idx = allSubMaterials.findIndex(s => s.id === subId);
        if (idx === 0) return true;
        for (let i = 0; i < idx; i++) {
            if (!isSubMaterialCompleted(allSubMaterials[i].id)) return false;
        }
        return true;
    };

    const overallProgress = allSubMaterials.length > 0
        ? Math.round((allSubMaterials.filter(s => isSubMaterialCompleted(s.id)).length / allSubMaterials.length) * 100)
        : 0;

    const [expandedMaterials, setExpandedMaterials] = useState(() => {
        const current = allMaterials.find(m => m.sub_materials?.some(s => s.id === currentSubMaterialId));
        return current ? { [current.id]: true } : {};
    });

    const toggleMaterial = (id) => setExpandedMaterials(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-slate-300 font-sans">
            <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-start gap-3 mb-4">
                    {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#10a37f] to-emerald-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-lg">{course.title?.charAt(0)?.toUpperCase() || 'C'}</span>
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[14px] leading-tight text-gray-900 dark:text-white line-clamp-2">{course.title}</h3>
                        <p className="text-[12px] text-gray-500 dark:text-slate-400 mt-1">{allMaterials.length} materi &bull; {allSubMaterials.length} sub-materi</p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] text-gray-500 dark:text-slate-400">Progress</span>
                        <span className="text-[12px] font-medium text-[#10a37f]">{overallProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#10a37f] transition-all duration-500 ease-out rounded-full" style={{ width: `${overallProgress}%` }} />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto learning-sidebar">
                {allMaterials.map((material, materialIndex) => {
                    const isExpanded = expandedMaterials[material.id];
                    const subMaterials = material.sub_materials || [];
                    const completedCount = subMaterials.filter(s => isSubMaterialCompleted(s.id)).length;
                    const hasCurrent = subMaterials.some(s => s.id === currentSubMaterialId);

                    return (
                        <div key={material.id} className="border-b border-gray-200 dark:border-slate-800 last:border-b-0">
                            <button
                                onClick={() => toggleMaterial(material.id)}
                                className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ${hasCurrent ? 'bg-gray-100/50 dark:bg-slate-800/50' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${
                                        completedCount === subMaterials.length && subMaterials.length > 0
                                            ? 'bg-[#10a37f] text-white'
                                            : completedCount > 0
                                            ? 'bg-[#10a37f]/20 text-[#10a37f]'
                                            : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
                                    }`}>
                                        {completedCount === subMaterials.length && subMaterials.length > 0 ? (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            materialIndex + 1
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[13px] font-medium text-gray-900 dark:text-white line-clamp-1">{material.title}</h4>
                                            <svg className={`w-4 h-4 text-gray-400 dark:text-slate-500 transition-transform duration-200 flex-shrink-0 ml-2 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <span className="text-[11px] text-gray-500 dark:text-slate-400">{completedCount}/{subMaterials.length} sub-materi</span>
                                    </div>
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`}>
                                <div className="pb-2">
                                    {subMaterials.map((sub) => {
                                        const isCompleted = isSubMaterialCompleted(sub.id);
                                        const isAccessible = canAccessSubMaterial(sub.id);
                                        const isCurrent = sub.id === currentSubMaterialId;

                                        return (
                                            <div key={sub.id}>
                                                {isAccessible ? (
                                                    <Link
                                                        href={route('member.courses.sub-materials.show', [course.id, sub.id])}
                                                        className={`flex items-center gap-3 px-4 py-2.5 pl-10 text-[13px] transition-colors ${
                                                            isCurrent
                                                                ? 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]'
                                                                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                                        }`}
                                                        onClick={(e) => {
                                                            if (onSubMaterialClick) {
                                                                e.preventDefault();
                                                                onSubMaterialClick(sub.id);
                                                            }
                                                        }}
                                                    >
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
                                                        <span className={`flex-1 line-clamp-1 ${isCurrent ? 'font-medium' : ''}`}>{sub.title}</span>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${getTypeBadgeClass(sub.type)}`}>{sub.type.toUpperCase()}</span>
                                                    </Link>
                                                ) : (
                                                    <div className="flex items-center gap-3 px-4 py-2.5 pl-10 text-[13px] text-gray-400 dark:text-slate-500 cursor-not-allowed">
                                                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        </div>
                                                        <span className="flex-1 line-clamp-1">{sub.title}</span>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 font-medium flex-shrink-0">{sub.type.toUpperCase()}</span>
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

function getTypeBadgeClass(type) {
    switch (type) {
        case 'video': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
        case 'text': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
        case 'pdf':
        case 'document': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
        case 'ebook': return 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]';
        case 'gmeet': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
        default: return 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400';
    }
}
