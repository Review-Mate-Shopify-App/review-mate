import {
  Page,
  LegacyCard,
  Text,
  DataTable,
  Layout,
  Spinner,
  EmptyState,
  Tag,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import React, { Fragment, useState } from "react";
import { useAppQuery } from "../hooks";
import NewReviewRequest from "../components/NewReviewRequest";

export default function Products() {
  let rows = [];
  let rowMarkup = [];
  const [isNewRequestFormOpen, setIsNewRequestFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();

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

  const renderImage = (imageUrl) => (
    <img
      src={imageUrl}
      alt="Product Image"
      style={{
        width: "50px",
        height: "50px",
        objectFit: "cover",
      }}
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
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
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
    rows = products.data.map(({ id, title, images, tags }, index) => ({
      id,
      title,
      image: images && images.length > 0 ? images[0].src : null,
      tags,
    }));

    // Map data for DataTable rowsMarkup
    rowMarkup = rows.map(({ id, title, image, tags }, index) => [
      <div
        key={id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div key={`${id}-combined`}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {image && renderImage(image)}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginLeft: "8px", fontSize: "16px" }}>
                {title}
              </span>
              <span
                style={{ marginLeft: "8px", fontSize: "12px", color: "gray" }}
              >
                #{id}
              </span>
            </div>
          </div>
        </div>
        <div>
          {tags !== "" &&
            tags.split(", ").map((tag) => (
              <Fragment key={tag}>
                {" "}
                <Tag>{tag}</Tag>&nbsp;
              </Fragment>
            ))}
        </div>
      </div>,
      <Button
        onClick={() => {
          setIsNewRequestFormOpen(true);
          setCurrentProduct([id, title]);
        }}
      >
        Collect Product Review
      </Button>,
    ]);
  }

  return (
    <Page fullWidth>
      <TitleBar title={"Product Catalog"} />

      <Layout>
        {isNewRequestFormOpen ? (
          <Layout.Section>
            <NewReviewRequest
              isOpen={isNewRequestFormOpen}
              setIsOpen={setIsNewRequestFormOpen}
              selectedProduct={currentProduct}
            />
          </Layout.Section>
        ) : (
          <>
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
                  columnContentTypes={["text"]}
                  headings={[
                    <div style={{ fontWeight: "bold" }}>Products</div>,
                    <div style={{ fontWeight: "bold" }}>Action</div>,
                  ]}
                  rows={rowMarkup}
                />
              )}
            </Layout.Section>
          </>
        )}
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
