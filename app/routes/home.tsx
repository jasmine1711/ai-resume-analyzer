import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
return [
{ title: "ResumeIQ" },
{ name: "description", content: "Smart insights and AI feedback to land your next job." },
];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
<section className="main-section">
<div className="page-heading">
<h1>Track Your Applications & Resume Ratings</h1>
<h2>Review your submissions and check AI-powered feedback . </h2>
</div>
</section>
</main>
}

