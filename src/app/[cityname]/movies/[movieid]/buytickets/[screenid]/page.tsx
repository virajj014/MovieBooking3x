"use client"
import React from 'react'
import './SelectSeat.css'
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const SelectSeatPage  = () => {

    const pathname = usePathname()
    const params = useParams()
    const searchParams = useSearchParams()

    const date = searchParams.get('date')
    const { movieid, cityname, screenid } = params
    console.log(movieid, cityname, screenid)




    const [screen, setScreen] = React.useState<any>(null)
    const [selectedTime, setSelectedTime] = React.useState<any>(null)

    const getschedules = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/schedulebymovie/${screenid}/${date}/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    console.log(response.data)
                    setScreen(response.data)
                    setSelectedTime(response.data.movieSchedulesforDate[0])
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))

    }

    const [movie, setMovie] = React.useState<any>(null)


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
                    console.log('movie', data.data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getschedules()
        getMovie()
    }, [])


    const [selectedSeats, setSelectedSeats] = React.useState<any[]>([])




    const selectdeselectseat = (seat: any) => {
        console.log(seat)
        // {
        //     "row": "F",
        //     "col": 1,
        //     "seat_id": "6",
        //     "price": 500
        // }
        const isselected = selectedSeats.find((s: any) => (
            s.row === seat.row &&
            s.col === seat.col &&
            s.seat_id === seat.seat_id
        ))

        if (isselected) {
            setSelectedSeats(selectedSeats.filter((s: any) => (
                s.row !== seat.row ||
                s.col !== seat.col ||
                s.seat_id !== seat.seat_id
            )))
        }

        else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }


    const generateSeatLayout = () => {
        const x = screen.movieSchedulesforDate.findIndex((t: any) => t.showTime === selectedTime.showTime)
     
        let notavailableseats = screen.movieSchedulesforDate[x].notAvailableSeats


        return (
            <div>
                {screen.screen.seats.map((seatType, index) => (
                    <div className="seat-type" key={index}>
                        <h2>{seatType.type} - Rs. {seatType.price}</h2>
                        <div className='seat-rows'>
                            {seatType.rows.map((row, rowIndex) => (
                                <div className="seat-row" key={rowIndex}>
                                    <p className="rowname">{row.rowname}</p>
                                    <div className="seat-cols">
                                        {row.cols.map((col, colIndex) => (


                                            <div className="seat-col" key={colIndex}>
                                                {col.seats.map((seat, seatIndex) => (
                                                    // console.log(seat),

                                                    <div key={seatIndex}>
                                                        {
                                                            notavailableseats.find((s: any) => (
                                                                s.row === row.rowname &&
                                                                s.seat_id === seat.seat_id &&
                                                                s.col === colIndex
                                                            )) ?
                                                                <span className='seat-unavailable'>
                                                                    {seatIndex + 1}
                                                                </span>
                                                                :
                                                                <span className={
                                                                    selectedSeats.find((s: any) => (
                                                                        s.row === row.rowname &&
                                                                        s.seat_id === seat.seat_id &&
                                                                        s.col === colIndex
                                                                    )) ? "seat-selected" : "seat-available"
                                                                }
                                                                    onClick={() => selectdeselectseat({
                                                                        row: row.rowname,
                                                                        col: colIndex,
                                                                        seat_id: seat.seat_id,
                                                                        price: seatType.price
                                                                    })}
                                                                >
                                                                    {seatIndex + 1}
                                                                </span>

                                                        }
                                                    </div>
                                                    // <div key={seatIndex}>
                                                    //     {seat.status === 'available' &&
                                                    //         <span className={
                                                    //             selectedSeats.find((s: any) => (
                                                    //                 s.row === row.rowname &&
                                                    //                 s.seat_id === seat.seat_id &&
                                                    //                 s.col === colIndex
                                                    //             )) ? "seat-selected" : "seat-available"
                                                    //         }
                                                    //         onClick={() => selectdeselectseat({
                                                    //             row: row.rowname,
                                                    //             col: colIndex,
                                                    //             seat_id: seat.seat_id,
                                                    //             price: seatType.price
                                                    //         })}
                                                    //     >
                                                    //         {seatIndex + 1}
                                                    //     </span>
                                                    //     }
                                                    //     {seat.status === 'not-available' &&
                                                    //         <span className="seat-unavailable">
                                                    //             {seatIndex + 1}
                                                    //         </span>
                                                    //     }
                                                    // </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <br /> <br /> <br />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const handleBooking = () => {


        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/bookticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                showTime: selectedTime.showTime,
                showDate: date,
                movieId: movieid,
                screenId: screenid,
                seats: selectedSeats,
                totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                paymentId: '123456789',
                paymentType: 'online'
            })

        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    toast.success('Booking Successful')
                    console.log(response)
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='selectseatpage'>
            {
                movie && screen &&
                <div className='s1'>
                    <div className='head'>
                        <h1>{movie.title} - {screen?.screen?.name}</h1>
                        <h3>{movie.genre.join(" / ")}</h3>
                    </div>
                </div>
            }

            {
                screen &&
                <div className="selectseat">
                    <div className='timecont'>
                        {
                            screen.movieSchedulesforDate.map((time: any, index: number) => (
                                <h3 className={selectedTime?._id === time._id ? 'time selected' : 'time'} 
                                onClick={() => {
                                    setSelectedTime(time)
                                    setSelectedSeats([])
                                }} key={index}>
                                    {time.showTime}
                                </h3>
                            ))
                        }
                    </div>
                    <div className='indicators'>
                        <div>
                            <span className='seat-unavailable'></span>
                            <p>Not available</p>
                        </div>
                        <div>
                            <span className='seat-available'></span>
                            <p>Available</p>
                        </div>
                        <div>
                            <span className='seat-selected'></span>
                            <p>Selected</p>
                        </div>
                    </div>

                    {generateSeatLayout()}


                    <div className='totalcont'>
                        <div className='total'>
                            <h2>Total</h2>
                            <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>

                        {/* <Link href="/" className='theme_btn1 linkstylenone'>Continue</Link> */}
                        <button
                            className='theme_btn1 linkstylenone'
                            onClick={handleBooking}
                        >Book Now</button>
                    </div>
                </div>
            }
            {/* 

            <div className="selectseat">
            
               
                
              
            </div> */}
        </div>
    )
}

export default SelectSeatPage 