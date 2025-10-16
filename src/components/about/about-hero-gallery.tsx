import Image from "next/image";

const galleryImages = [
  "/assets/img/backup-original/inner-about/gallery/gallery-1.jpg",
  "/assets/img/backup-original/inner-about/gallery/gallery-2.jpg",
  "/assets/img/backup-original/inner-about/gallery/gallery-3.jpg",
  "/assets/img/backup-original/inner-about/gallery/gallery-4.jpg",
];

export default function AboutHeroGallery() {
  return (
    <section className="about-hero-gallery" style={{ margin: '2.5rem 0' }}>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {galleryImages.map((src, idx) => (
            <div key={src} className="col-6 col-md-3">
              <div style={{ borderRadius: '1.2rem', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                <Image
                  src={src}
                  alt={`About Gallery ${idx + 1}`}
                  width={400}
                  height={400}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
                  placeholder="blur"
                  blurDataURL="/assets/img/backup-original/inner-about/gallery/gallery-1.jpg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
