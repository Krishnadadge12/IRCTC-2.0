Place the high-resolution background image (the one you provided as attachment) into the public images folder to use it as the page background.

Recommended path (already referenced by CSS):

  Bookings/public/images/booking-bg.jpg

Notes:
- I added a placeholder SVG at `public/images/booking-bg.svg` that the page will show right away.
- To use your attached image, copy it to `Bookings/public/images/booking-bg.jpg`. Vite serves files from `public/` at the site root, so CSS references `/images/booking-bg.jpg`.
- If you prefer a PNG/WebP, name it `booking-bg.jpg` (or change the URL in `BookingForm.css` to match the filename).
