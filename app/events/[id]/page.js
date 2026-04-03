import { EVENTS } from "@/lib/data";
import EventDetailClient from "./EventDetailClient";

export function generateStaticParams() {
  return EVENTS.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) return { title: "Event Not Found" };

  return {
    title: event.name,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
        <p className="text-gray-400">The event you are looking for does not exist.</p>
      </div>
    );
  }

  return <EventDetailClient event={event} />;
}
