import React from 'react'


type SeatProps = {
    availableSeats: number,
    plugs: number,
    leavingTime: number,
  }

export const Seat: React.FC<SeatProps> = () => {
  return (
    <div>Seat</div>
  )
}
