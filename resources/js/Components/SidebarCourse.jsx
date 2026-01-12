import { Link } from '@inertiajs/react';

export default function SidebarCourse({ 
    course, 
    sessions, 
    currentMaterialId, 
    userProgress = {},
    onMaterialClick 
}) {
    // Helper to check if a material is completed
    const isMaterialCompleted = (materialId) => {
        return userProgress[materialId]?.is_completed === true;
    };

    // Helper to check if a material is accessible (all previous materials completed)
    const isMaterialAccessible = (materialIndex, sessionIndex, allMaterials) => {
        // First material is always accessible
        if (materialIndex === 0 && sessionIndex === 0) return true;

        // Check all previous materials
        let previousMaterialsCompleted = true;
        for (let i = 0; i < allMaterials.length; i++) {
            if (allMaterials[i].id === allMaterials[materialIndex + sessionIndex * 1000]?.id) {
                break;
            }
            if (!isMaterialCompleted(allMaterials[i].id)) {
                previousMaterialsCompleted = false;
                break;
            }
        }
        return previousMaterialsCompleted;
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

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Course Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                </h3>
            </div>

            {/* Sessions and Materials */}
            <div className="divide-y divide-gray-100">
                {sessions.map((session, sessionIndex) => (
                    <div key={session.id} className="py-2">
                        {/* Session Header */}
                        <div className="px-4 py-2">
                            <h4 className="text-sm font-medium text-gray-700 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                                    {sessionIndex + 1}
                                </span>
                                {session.title}
                            </h4>
                        </div>

                        {/* Materials List */}
                        <ul className="mt-1 space-y-1">
                            {session.materials?.map((material, materialIndex) => {
                                const isCompleted = isMaterialCompleted(material.id);
                                const isAccessible = canAccessMaterial(material.id);
                                const isCurrent = material.id === currentMaterialId;

                                return (
                                    <li key={material.id}>
                                        {isAccessible ? (
                                            <Link
                                                href={route('member.courses.materials.show', [course.id, material.id])}
                                                className={`flex items-center px-4 py-2 text-sm transition-colors ${
                                                    isCurrent
                                                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                                }`}
                                                onClick={(e) => {
                                                    if (onMaterialClick) {
                                                        e.preventDefault();
                                                        onMaterialClick(material.id);
                                                    }
                                                }}
                                            >
                                                {/* Status Icon */}
                                                <span className="mr-3 flex-shrink-0">
                                                    {isCompleted ? (
                                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    ) : (
                                                        <MaterialTypeIcon type={material.type} />
                                                    )}
                                                </span>
                                                
                                                {/* Material Title */}
                                                <span className="flex-1 line-clamp-1">
                                                    {material.title}
                                                </span>

                                                {/* Type Badge */}
                                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getTypeBadgeClass(material.type)}`}>
                                                    {material.type}
                                                </span>
                                            </Link>
                                        ) : (
                                            <div className="flex items-center px-4 py-2 text-sm text-gray-400 cursor-not-allowed border-l-4 border-transparent">
                                                {/* Lock Icon */}
                                                <span className="mr-3 flex-shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </span>
                                                
                                                {/* Material Title */}
                                                <span className="flex-1 line-clamp-1">
                                                    {material.title}
                                                </span>

                                                {/* Type Badge */}
                                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-400">
                                                    {material.type}
                                                </span>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helper component for material type icons
function MaterialTypeIcon({ type }) {
    const iconClass = "w-5 h-5 text-gray-400";
    
    switch (type) {
        case 'video':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'text':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'pdf':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            );
        case 'ebook':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        case 'gmeet':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            );
        default:
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
    }
}

// Helper function for type badge classes
function getTypeBadgeClass(type) {
    switch (type) {
        case 'video':
            return 'bg-red-100 text-red-700';
        case 'text':
            return 'bg-blue-100 text-blue-700';
        case 'pdf':
            return 'bg-orange-100 text-orange-700';
        case 'ebook':
            return 'bg-purple-100 text-purple-700';
        case 'gmeet':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}
