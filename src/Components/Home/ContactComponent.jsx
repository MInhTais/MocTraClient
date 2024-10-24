import React, { useEffect } from "react";
import { CONTACT_PAGE_DESCRIPTION, CONTACT_PAGE_TITLE } from "../../Common/Const/Page/PageConst";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";

export default function ContactComponent() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  return (
    <>
      <MetaDecorator title={CONTACT_PAGE_TITLE} description={CONTACT_PAGE_DESCRIPTION} />
      <section className="contact spad">
      <div className="fold:m-0 lg:m-10">
        <div className="flex fold:flex-col lg:flex-row">
          <div className="fold:w-full lg:w-1/2">
            <div className="contact__content">
              <div className="contact__address text-left">
                <h5>THÔNG TIN LIÊN LẠC</h5>
                <ul>
                  <li>
                    <h6>
                      <i className="fa fa-map-marker" /> Địa chỉ
                    </h6>
                    <p>
                      342, Đường B21, KDC 91B, Nguyễn Văn Linh, Quận Ninh Kiều, Thành phố Cần Thơ.
                    </p>
                  </li>
                  <li>
                    <h6>
                      <i className="fa fa-phone" /> Điện thoại
                    </h6>
                    <p>
                      <span>0702362681</span>
                      <span>0778109208</span>
                      <span>0374249600</span>
                      <span>0776563673</span>
                    </p>
                  </li>
                  <li>
                    <h6>
                      <i className="fa fa-headphones" /> Hỗ trợ
                    </h6>
                    <p>tranlong18799@gmail.com</p>
                  </li>
                </ul>
              </div>
              <div className="contact__form">
                <h5>HỖ TRỢ</h5>
                <form action="#">
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <textarea placeholder="Message" defaultValue={""} />
                  <button type="submit" className="site-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="fold:w-full lg:w-1/2">
            <div className="contact__map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.1557339443716!2d105.75223134631396!3d10.024662013481468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0884668454353%3A0x4bae2af286a22841!2zMzQyIMSQxrDhu51uZyBCMjEsIFBoxrDhu51uZyBBbiBLaMOhbmgsIE5pbmggS2nhu4F1LCBD4bqnbiBUaMahLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1639198534014!5m2!1svi!2s"
             height={780}
             style={{border:0}} 
             allowfullscreen="" 
             loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
