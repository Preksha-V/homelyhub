import React from 'react'
<PropertyMapInfo address={address} />

const PropertyMapInfo = () => {
  return (
    <>

    <div className='map-image-container col-md-6 col-sm-12 col-12'>
      <h2 className='map-header'> Location</h2>
      <img src='https://tse3.mm.bing.net/th/id/OIP.mcxJ_1JrlaVZVyJtmBy5wgHaEo?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' 
      alt='map' 
      className='map-image'/>
        
    </div>

    <div className='extra-info col-md-6 col-sm-12 col-12'>
        <h2 className='extra-heading'> Extra Info</h2>
        <p className='extra-description'>
        Tourism hotels cater to travelers by offering a range of accommodations that combine comfort, convenience, and often leisure or business amenities. 
        These hotels vary from luxury resorts and boutique hotels with high-end services, such as spa facilities, fine dining, and concierge services, to budget
         hotels and chains that focus on affordability and essential comforts like clean rooms, Wi-Fi, and easy access to local attractions.
          Many tourism hotels are strategically located near popular tourist areas, airports, transport hubs, and cultural landmarks to provide
           convenient access for visitors. Services often extend to guided tours, airport transfers, recreational activities, and conference or event facilities 
           for business travelers. Additionally, hotels can feature unique aspects such as heritage architecture, eco-friendly designs, or themed interiors to enhance
            the visitor experience, making them not only a place to stay but also a part of the travel experience.


        </p>

    </div>

        </>
  )
}

export default PropertyMapInfo
