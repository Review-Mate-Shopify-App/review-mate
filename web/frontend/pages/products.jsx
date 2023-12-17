import {
  Page,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  DataTable,
  Layout,
  Spinner,
  EmptyState,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import React from "react";
import { useAppQuery } from "../hooks";

export default function Products() {
  let rows = [];
  let rowMarkup = [];

  const {
    data: products,
    isLoading: isLoading,
    isError,
  } = useAppQuery({
    url: "/api/products/",
    reactQueryOptions: {
      onSuccess: () => {},
    },
  });

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const renderImage = (imageUrl) => (
    <img
      src={imageUrl}
      alt="Product Image"
      style={{ width: "50px", height: "50px", objectFit: "cover" }}
    />
  );

  if (isLoading) {
    return (
      <Page fullWidth>
        <TitleBar title={"Product Catalog"} />
        <Layout>
          <Layout.Section>
            <ProductPublishCount />
          </Layout.Section>
          <Layout.Section>
            <LegacyCard>
              <Spinner size="large" />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  if (isError) {
    return (
      <Page fullWidth>
        <TitleBar title={"Product Catalog"} />
        <Layout>
          <Layout.Section>
            <ProductPublishCount productLength={rows.length} />
          </Layout.Section>
          <Layout.Section>
            <LegacyCard>
              <p>Error loading products. Please try again.</p>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  if (products && products.data) {
    // Map data for DataTable rows

    rows = products.data.map(({ id, title, images }, index) => ({
      id,
      title,
      image: images && images.length > 0 ? images[0].src : null,
    }));

    // Map data for DataTable rowsMarkup
    rowMarkup = rows.map(({ id, title, image }, index) => [
      <Text alignment="center" key={id}>
        {id}
      </Text>,
      <Text key={`${id}-combined`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {image && renderImage(image)}
          <span style={{ marginLeft: "8px" }}>{title}</span>
        </div>
      </Text>,
    ]);
  }

  return (
    <Page fullWidth>
      <TitleBar title={"Product Catalog"} />

      <Layout>
        <Layout.Section>
          <ProductPublishCount productLength={rows.length ?? 0} />
        </Layout.Section>

        <Layout.Section>
          {rows.length === 0 ? (
            <Layout.Section>
              <LegacyCard sectioned>
                <EmptyState
                  heading="No Products Found"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                ></EmptyState>
              </LegacyCard>
            </Layout.Section>
          ) : (
            <DataTable
              // condensed={useBreakpoints().smDown}
              columnContentTypes={["text", "text"]}
              headings={[
                <div style={{ fontWeight: "bold" }}>ID</div>,
                <div style={{ fontWeight: "bold" }}>Products</div>,
              ]}
              rows={rowMarkup}
            />
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function ProductPublishCount({ productLength }) {
  const rows = [["Total", productLength]];

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
