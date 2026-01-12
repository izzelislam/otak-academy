import { Head, Link, usePage } from '@inertiajs/react';
import LearningLayout from '@/Layouts/LearningLayout';
import LearningSidebar from '@/Components/LearningSidebar';
import { VideoContent, TextContent, PdfContent, EbookContent, GmeetContent } from '@/Components/MaterialContent';

export default function MaterialShow({ course, material, userProgress, progressPercentage, isCompleted }) {
    const { flash } = usePage().props;

    // Render material content based on type
    const renderMaterialContent = () => {
        switch (material.type) {
            case 'video':
                return <VideoContent content={material.content} title={material.title} />;
            case 'text':
                return <TextContent content={material.content} />;
            case 'pdf':
                return <PdfContent content={material.content} title={material.title} />;
            case 'ebook':
                return <EbookContent content={material.content} title={material.title} />;
            case 'gmeet':
                return <GmeetContent content={material.content} title={material.title} />;
            default:
                return (
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-8 text-center">
                        <p className="text-gray-500 dark:text-slate-400">Unknown material type</p>
                    </div>
                );
        }
    };

    // Find next material
    const findNextMaterial = () => {
        const allMaterials = [];
        course.sessions?.forEach(session => {
            session.materials?.forEach(m => {
                allMaterials.push(m);
            });
        });

        const currentIndex = allMaterials.findIndex(m => m.id === material.id);
        if (currentIndex >= 0 && currentIndex < allMaterials.length - 1) {
            return allMaterials[currentIndex + 1];
        }
        return null;
    };

    // Find previous material
    const findPreviousMaterial = () => {
        const allMaterials = [];
        course.sessions?.forEach(session => {
            session.materials?.forEach(m => {
                allMaterials.push(m);
            });
        });

        const currentIndex = allMaterials.findIndex(m => m.id === material.id);
        if (currentIndex > 0) {
            return allMaterials[currentIndex - 1];
        }
        return null;
    };

    const nextMaterial = findNextMaterial();
    const previousMaterial = findPreviousMaterial();

    // Check if next material is accessible
    const canAccessNext = nextMaterial && isCompleted;

    const sidebar = (
        <LearningSidebar
            course={course}
            sessions={course.sessions || []}
            currentMaterialId={material.id}
            userProgress={userProgress}
        />
    );

    return (
        <LearningLayout 
            course={course} 
            material={material} 
            progressPercentage={progressPercentage}
            sidebar={sidebar}
        >
            <Head title={`${material.title} - ${course.title}`} />

            {/* Flash Messages */}
            {(flash?.success || flash?.error) && (
                <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 border border-[#10a37f]/20 dark:border-[#10a37f]/30 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-[#10a37f] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-[#10a37f]">{flash.success}</p>
                            </div>
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-700 dark:text-red-300">{flash.error}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Material Content */}
                <div className="flex-1 p-4 sm:p-6">
                    {renderMaterialContent()}
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            {/* Previous Button */}
                            <div>
                                {previousMaterial ? (
                                    <Link
                                        href={route('member.courses.materials.show', [course.id, previousMaterial.id])}
                                        className="inline-flex items-center px-4 py-2 text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </Link>
                                ) : (
                                    <span></span>
                                )}
                            </div>

                            {/* Mark Complete / Status */}
                            <div className="flex items-center space-x-4">
                                {isCompleted ? (
                                    <span className="flex items-center text-[#10a37f]">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium">Completed</span>
                                    </span>
                                ) : (
                                    <Link
                                        href={route('member.courses.materials.complete', [course.id, material.id])}
                                        method="post"
                                        as="button"
                                        className="inline-flex items-center px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#10a37f] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Mark as Complete
                                    </Link>
                                )}
                            </div>

                            {/* Next Button */}
                            <div>
                                {nextMaterial ? (
                                    canAccessNext ? (
                                        <Link
                                            href={route('member.courses.materials.show', [course.id, nextMaterial.id])}
                                            className="inline-flex items-center px-4 py-2 text-sm bg-[#10a37f] hover:bg-[#0e8c6b] text-white rounded-lg font-medium transition-colors"
                                        >
                                            Next
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <span className="inline-flex items-center px-4 py-2 text-sm text-gray-400 dark:text-slate-500 cursor-not-allowed rounded-lg">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Next (Locked)
                                        </span>
                                    )
                                ) : (
                                    <Link
                                        href={route('member.courses.show', course.id)}
                                        className="inline-flex items-center px-4 py-2 text-sm bg-[#10a37f] hover:bg-[#0e8c6b] text-white rounded-lg font-medium transition-colors"
                                    >
                                        Finish Course
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
