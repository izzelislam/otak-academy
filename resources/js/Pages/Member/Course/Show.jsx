import { Head, Link } from '@inertiajs/react';
import LearningLayout from '@/Layouts/LearningLayout';
import LearningSidebar from '@/Components/LearningSidebar';
import { VideoContent, TextContent, PdfContent, EbookContent, GmeetContent } from '@/Components/MaterialContent';

export default function CourseShow({ course, userProgress, progressPercentage, currentMaterial }) {
    // Render material content based on type
    const renderMaterialContent = (material) => {
        if (!material) return null;

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

    // Check if current material is completed
    const isCurrentMaterialCompleted = currentMaterial && 
        userProgress[currentMaterial.id]?.is_completed === true;

    const sidebar = (
        <LearningSidebar
            course={course}
            sessions={course.sessions || []}
            currentMaterialId={currentMaterial?.id}
            userProgress={userProgress}
        />
    );

    return (
        <LearningLayout 
            course={course} 
            material={currentMaterial} 
            progressPercentage={progressPercentage}
            sidebar={sidebar}
        >
            <Head title={course.title} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {currentMaterial ? (
                    <>
                        {/* Material Content */}
                        <div className="flex-1 p-4 sm:p-6">
                            {renderMaterialContent(currentMaterial)}
                        </div>

                        {/* Mark Complete Footer */}
                        <div className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {isCurrentMaterialCompleted ? (
                                            <span className="flex items-center text-[#10a37f]">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium">Completed</span>
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 dark:text-slate-400 text-sm">
                                                Mark this material as complete to unlock the next one
                                            </span>
                                        )}
                                    </div>
                                    {!isCurrentMaterialCompleted && (
                                        <Link
                                            href={route('member.courses.materials.complete', [course.id, currentMaterial.id])}
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
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                            <svg className="mx-auto h-16 w-16 text-[#10a37f] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Course Completed!
                            </h3>
                            <p className="text-gray-500 dark:text-slate-400 mb-6">
                                Congratulations! You have completed all materials in this course.
                            </p>
                            <Link
                                href={route('member.dashboard')}
                                className="inline-flex items-center px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] text-white rounded-lg font-medium transition-colors"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </LearningLayout>
    );
}
