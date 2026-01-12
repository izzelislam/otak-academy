import { Head, Link } from '@inertiajs/react';
import MemberLayout from '@/Layouts/MemberLayout';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

export default function CourseComplete({ course }) {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const quotes = [
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
        "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. - Malcolm X",
        "The beautiful thing about learning is that no one can take it away from you. - B.B. King"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <MemberLayout title="Course Completed">
            <Head title={`Completed - ${course.title}`} />

            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.1}
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-center py-16">
                            
                            <div className="mb-8 flex justify-center">
                                <div className="h-24 w-24 bg-[#10a37f]/10 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Selamat! Kamu sudah menyelesaikan course ini
                            </h3>
                            
                            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
                                {course.title}
                            </p>

                            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-700/50 p-8 rounded-2xl mb-10 relative">
                                <svg className="absolute top-4 left-4 w-8 h-8 text-gray-300 dark:text-gray-600 transform scale-y-[-1]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.0547 14.5098 14.9609 15.4951 14.7188C15.9395 14.6367 16.6348 14.6172 17.5752 14.6602L18.1768 14.6797L18.7783 14.6602C19.7217 14.6172 20.417 14.6367 20.8643 14.7188C21.8467 14.9609 22.3398 16.0547 22.3398 18L22.3398 21L20.8984 21L20.8984 18.2344C20.8984 16.2773 20.1016 16.2344 18.1768 16.2734C16.252 16.2344 15.4551 16.2773 15.4551 18.2344L15.4551 21L14.017 21ZM1.66016 21L1.66016 18C1.66016 16.0547 2.15286 14.9609 3.13818 14.7188C3.5826 14.6367 4.27788 14.6172 5.21826 14.6602L5.81985 14.6797L6.42144 14.6602C7.36476 14.6172 8.06004 14.6367 8.50732 14.7188C9.48974 14.9609 9.98242 16.0547 9.98242 18L9.98242 21L8.54102 21L8.54102 18.2344C8.54102 16.2773 7.74414 16.2344 5.81985 16.2734C3.89505 16.2344 3.09814 16.2773 3.09814 18.2344L3.09814 21L1.66016 21ZM4.95703 12L7.33008 3.52734L11.5332 3.52734L9.58984 12L4.95703 12ZM17.3115 12L19.6846 3.52734L23.8877 3.52734L21.9443 12L17.3115 12Z" />
                                </svg>
                                
                                <p className="text-lg text-gray-600 dark:text-gray-300 italic relative z-10 px-6">
                                    "{randomQuote}"
                                </p>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Link
                                    href={route('member.courses.index')}
                                    className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition ease-in-out duration-150"
                                >
                                    Back to My Courses
                                </Link>
                                
                                <Link
                                    href={route('member.courses.show', course.id)}
                                    className="inline-flex items-center px-6 py-3 bg-[#10a37f] border border-transparent rounded-lg font-semibold text-white hover:bg-[#0e8c6b] transition ease-in-out duration-150"
                                >
                                    Review Course Material
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
}
