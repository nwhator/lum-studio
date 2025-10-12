import Link from "next/link";
import React from "react";

// type 
type IProps = {
  cls?: string;
};

export default function BigText({cls=""}: IProps) {
  return (
    <div className={`sv-big-text-area pb-80 ${cls}`}>
      <div className="container container-1530">
        <div className="sv-small-text-box d-flex justify-content-between">
          <span>PROFESSIONAL PHOTOGRAPHY</span>
          <span>LUM STUDIOS</span>
        </div>
        <div className="sv-big-text-box">
          <h4 className="sv-big-text tp-char-animation">
            <Link href="/booking">Book Your Session</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
