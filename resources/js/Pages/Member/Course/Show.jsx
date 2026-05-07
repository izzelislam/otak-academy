import { Head, Link } from '@inertiajs/react';
import LearningLayout from '@/Layouts/LearningLayout';
import LearningSidebar from '@/Components/LearningSidebar';
import { VideoContent, TextContent, PdfContent, EbookContent, GmeetContent } from '@/Components/MaterialContent';

export default function CourseShow({ course, userProgress, progressPercentage, currentSubMaterial }) {
    const renderContent = (item) => {
        if (!item) return null;
        switch (item.type) {
            case 'video': return <VideoContent content={item.content} title={item.title} />;
            case 'text': return <TextContent content={item.content} />;
            case 'pdf':
            case 'document': return <PdfContent content={item.content} title={item.title} />;
            case 'ebook': return <EbookContent content={item.content} title={item.title} />;
            case 'gmeet': return <GmeetContent content={item.content} title={item.title} />;
            default: return <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-8 text-center"><p className="text-gray-500 dark:text-slate-400">Tipe konten tidak dikenali</p></div>;
        }
    };

    const isCurrentCompleted = currentSubMaterial &&
        userProgress[currentSubMaterial.id]?.is_completed === true;

    const sidebar = (
        <LearningSidebar
            course={course}
            sessions={course.sessions || []}
            currentSubMaterialId={currentSubMaterial?.id}
            userProgress={userProgress}
        />
    );

    return (
        <LearningLayout
            course={course}
            material={currentSubMaterial}
            progressPercentage={progressPercentage}
            sidebar={sidebar}
        >
            <Head title={course.title} />

            <div className="flex-1 flex flex-col">
                {currentSubMaterial ? (
                    <>
                        <div className="flex-1 p-4 sm:p-6">
                            {renderContent(currentSubMaterial)}
                        </div>

                        <div className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {isCurrentCompleted ? (
                                            <span className="flex items-center text-[#10a37f]">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium">Selesai</span>
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 dark:text-slate-400 text-sm">
                                                Tandai selesai untuk membuka sub-materi berikutnya
                                            </span>
                                        )}
                                    </div>
                                    {!isCurrentCompleted && (
                                        <Link
                                            href={route('member.courses.sub-materials.complete', [course.id, currentSubMaterial.id])}
                                            method="post"
                                            as="button"
                                            className="inline-flex items-center px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#10a37f] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Tandai Selesai
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
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Course Selesai!</h3>
                            <p className="text-gray-500 dark:text-slate-400 mb-6">Selamat! Anda telah menyelesaikan semua materi.</p>
                            <Link href={route('member.dashboard')} className="inline-flex items-center px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] text-white rounded-lg font-medium transition-colors">
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </LearningLayout>
    );
}
