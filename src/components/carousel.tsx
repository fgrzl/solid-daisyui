// Carousel component
export interface CarouselProps {
  items: string[];
}

export default function Carousel(props: CarouselProps) {
  return <div>{props.items.join(", ")}</div>;
}
