export interface CardProps {
  title: string;
  content: string;
  className?: string;
  style?: Record<string, string | number>;
}

// Card component
export default function Card(props: CardProps) {
  return (
    <div>
      {props.title} - {props.content}
    </div>
  );
}
