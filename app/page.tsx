import Title from './components/Title/Title'
import Wave from './components/Wave/Wave'
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Title />
      <Wave />
      <Analytics/>
    </div>
  );
}
