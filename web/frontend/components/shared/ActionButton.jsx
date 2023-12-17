import { Button } from "@shopify/polaris";

export default function ActionButton({ id, url }) {
  return (
    <div>
      <Button id={id} external={url}>
        Publish
      </Button>
    </div>
  );
}
