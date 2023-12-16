import {
  Page,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  useBreakpoints,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import React from "react";
import Rating from "../components/shared/Rating";
import ActionButton from "../components/shared/ActionButton";

export default function Products() {
  const orders = [
    {
      id: "11",
      product: "Snowboard",
      rating: <Rating value={3} />,
      review: "1",
      action: <ActionButton url={"google.com"} id={"11"} />,
    },
    {
      id: "12",
      product: "Multi Snowboard",
      rating: <Rating value={5} />,
      review: "1",
      action: <ActionButton url={"google.com"} id={"12"} />,
    },
    {
      id: "13",
      product: "Snowboard Fire",
      rating: <Rating value={2} />,
      review: "1",
      action: <ActionButton url={"google.com"} id={"13"} />,
    },
  ];

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    ({ id, product, rating, review, action }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span" color="#0000FF">
            {product}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{rating}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="center" numeric>
            {review}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{action}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Page fullWidth>
      <TitleBar title={"Product Catalog"} />
      <Layout>
        <LegacyCard>
          <IndexTable
            condensed={useBreakpoints().smDown}
            resourceName={resourceName}
            itemCount={orders.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "Products" },
              { title: "Rating" },
              { title: "Reviews" },
              { title: "Action", alignment: "end" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </Layout>
    </Page>
  );
}
