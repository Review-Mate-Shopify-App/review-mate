import {
  Page,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  DataTable,
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
          <Text as="span" alignment="start" numeric>
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
        <Layout.Section>
          <ProductPublishCount />
        </Layout.Section>
        <Layout.Section>
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
                { title: "Action", alignment: "start" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function ProductPublishCount() {
  const rows = [
    ["Published", 18],
    ["Total", 100],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 5,
        width: "200px",
      }}
    >
      <LegacyCard>
        <DataTable
          columnContentTypes={["text", "numeric"]}
          headings={[
            <div style={{ fontWeight: "bold" }}>Status</div>,
            <div style={{ fontWeight: "bold" }}>Products</div>,
          ]}
          rows={rows}
        />
      </LegacyCard>
    </div>
  );
}
