import React from "react";
import Image from "next/image";
// images
import location_1 from "@/assets/img/inner-contact/contact/info-1.jpg";
import location_2 from "@/assets/img/inner-contact/contact/info-2.jpg";
import location_3 from "@/assets/img/inner-contact/contact/info-3.jpg";

// data
const location_data = [
  {
    id: 1,
    img: location_1,
    country: "Nigeria",
    time: "Open: 9:00am – 6:00pm",
    location_title: "LUM Studios",
    address: "Opp. Hammedal Filling Station, Ilesha-Garage, Ile-ife, Osun State",
    phone: "+2348145538164",
    phone2: "+2349022292514",
    email: "contact@thelumstudios.com",
    map_link: "https://maps.app.goo.gl/58XNcbtgwe9uyXiNA",
  },
];

const ContactLocation = () => {
  return (
    <div className="cn-contact-info-area">
      <div className="container container-1840">
        <div className="cn-contact-info-bg black-bg">
          {location_data.map((item) => (
            <div key={item.id} className="cn-contact-info-item">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <div className="cn-contact-left d-flex flex-wrap align-items-center justify-content-center mb-40">
                    <div className="cn-contact-info-thumb">
                      <Image src={item.img} alt="image" style={{ height: "auto" }} />
                    </div>
                    <div className="cn-contact-left-info text-center">
                      <h4 className="cn-contact-left-title">{item.country}</h4>
                      <span>
                        <i className="fa-regular fa-clock"></i>
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xl-8">
                  <div className="cn-contact-right-wrap d-flex flex-column align-items-center text-center">
                    <div className="cn-contact-right mb-30">
                      <div className="cn-contact-location">
                        <span className="cn-contact-location-title">
                          {item.location_title}
                        </span>
                        <a
                          href={item.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.address}
                        </a>
                      </div>
                      <div className="cn-contact-map">
                        <a href={item.map_link} target="_blank" rel="noopener noreferrer">Google Maps</a>
                      </div>
                    </div>
                    <div className="cn-contact-right-info text-center">
                      <a href={`tel:${item.phone}`}>{item.phone}</a> <br />
                      <a href={`tel:${item.phone2}`}>{item.phone2}</a> <br />
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;