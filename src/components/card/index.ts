// Export the original Card component for backward compatibility
export { default as Card } from "./card";
export type { CardProps } from "./card";

// Export compound Card components (new composition API)
export { default as CardHeader } from "./card-header";
export { default as CardBody } from "./card-body";
export { default as CardActions } from "./card-actions";

// Export compound component types
export type { CardHeaderProps } from "./card-header";
export type { CardBodyProps } from "./card-body";
export type { CardActionsProps } from "./card-actions";

// Create compound Card object for the desired API
import CardComponent from "./card";
import CardHeaderComponent from "./card-header";
import CardBodyComponent from "./card-body";
import CardActionsComponent from "./card-actions";

// Compound Card object that allows Card.Header, Card.Body, etc.
export const card = {
  Header: CardHeaderComponent,
  Body: CardBodyComponent,
  Actions: CardActionsComponent,
};

// Also export with traditional casing
export const Card2 = {
  Header: CardHeaderComponent,
  Body: CardBodyComponent,
  Actions: CardActionsComponent,
};

// Create the compound component by adding sub-components as properties
const Card = CardComponent as typeof CardComponent & {
  Header: typeof CardHeaderComponent;
  Body: typeof CardBodyComponent;
  Actions: typeof CardActionsComponent;
};

// Attach sub-components to main Card component
Card.Header = CardHeaderComponent;
Card.Body = CardBodyComponent;
Card.Actions = CardActionsComponent;

// Export the compound component as default
export default Card;