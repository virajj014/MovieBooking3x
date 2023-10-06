"use client"
import React from 'react'
import { BsShare } from 'react-icons/bs'
import { BsFillStarFill } from 'react-icons/bs';
import './MoviePage.css'
import MovieCarousel from '@/components/moviecarousel/MovieCarousel';


import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import CelebCard from '@/components/CelebCard/CelebCard';
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link';


const MoviePage = () => {
    const pathname = usePathname()
    const { movieid } = useParams()
   
    const [movie, setMovie] = React.useState<any>(null)
    console.log(movieid)

    const getMovie = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })




        // {
        //     "_id": "65101a2acc5b257e6f2816a5",
        //     "title": "Jawan",
        //     "description": "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.",
        //     "portraitImgUrl": "http://res.cloudinary.com/dy4laycuf/image/upload/v1695554088/wbfwtq1nksdazxdrelxa.webp",
        //     "landscapeImgUrl": "http://res.cloudinary.com/dy4laycuf/image/upload/v1695554090/s3iwjeae4nev6ug3r0et.png",
        //     "rating": 8,
        //     "genre": [
        //         "Action",
        //         "Thriller"
        //     ],
        //     "duration": 130,
        //     "cast": [],
        //     "crew": [],
        //     "__v": 0
        // }
    }
   

    React.useEffect(() => {
        getMovie()
    }, [])

    return (
        <>
            {
                movie &&
                <div className='moviepage'>
                    <div className='c1' style={{
                        backgroundImage: `url(${movie.landscapeImgUrl})`
                    }}>
                        <div className='c11'>
                            <div className='left'>
                                <div className='movie_poster'
                                    style={{
                                        backgroundImage: `url(${movie.portraitImgUrl})`
                                    }}
                                >
                                    <p>In cinemas</p>
                                </div>
                                <div className='movie_details'>
                                    <p className='title'>
                                        {movie.title}
                                    </p>
                                    <p className='rating'>
                                        <BsFillStarFill className='star' />&nbsp;&nbsp;
                                        {movie.rating}/10
                                    </p>
                                    {/* <div className='halls_languages'>
                                <p className='halls'>
                                    {
                                        movie.halls.map((hall, index) => {
                                            return (
                                                <span key={index}>{hall} </span>
                                            )
                                        })
                                    }
                                </p>
                                <p className='languages'>
                                    {movie.languages.map((language, index) => {
                                        return (
                                            <span key={index}>{language} </span>
                                        )
                                    })}
                                </p>
                            </div> */}
                                    <p className='duration_type_releasedat'>
                                        <span className='duration'>
                                            {movie.duration}
                                        </span>
                                        <span>•</span>
                                        <span className='type'>
                                            {movie.genre.join(', ')}
                                        </span>
                                        {/* <span>•</span>
                                <span className='releasedat'>
                                    {movie.releasedate}
                                </span> */}
                                    </p>
                                    <Link
                                        href={`${pathname}/buytickets`}
                                        className='linkstylenone'
                                    >
                                        <button className='bookbtn'>Book Tickets</button>
                                    </Link>

                                </div>
                            </div>
                            <div className='right'>

                                <button className='sharebtn'><BsShare className='shareicon' />Share</button>
                            </div>
                        </div>
                    </div>
                    <div className='c2'>
                        <h1>About the Movie</h1>
                        <p>{movie.description}</p>
                        {
                            movie.cast.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Cast</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.cast.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        {
                            movie.crew.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Crew</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.crew.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        <div className='line'></div>
                        <h1>Your might also like</h1>
                        <MovieCarousel />
                    </div>

                </div>
            }
        </>
    )
}

export default MoviePage