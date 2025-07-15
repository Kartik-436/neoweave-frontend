import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'; // Make sure this path is correct for your global CSS file
import {
  barlow,
  dancingScript,
  facultyGlyphic,
  inter,
  kanit,
  lato,
  montserrat,
  parkinsans,
  poppins,
  raleway,
  robotoCondensed,
  roboto,
  spaceGrotesk,
  marcellus
} from "./../lib/fonts"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GitFund",
  description: "Get money through open source",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} ${dancingScript.variable} ${facultyGlyphic.variable} ${inter.variable} ${kanit.variable} ${lato.variable} ${montserrat.variable} ${parkinsans.variable} ${poppins.variable} ${raleway.variable} ${robotoCondensed.variable} ${roboto.variable} ${spaceGrotesk.variable} ${marcellus.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
