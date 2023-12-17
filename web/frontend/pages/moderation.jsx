import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  Button,
  Grid,
  Card,
  Tag,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import Rating from "../components/shared/Rating";
import Input from "../components/shared/Input";
import { useAppQuery } from "../hooks";

// const rows = [
//   {
//     id: 1,
//     productTitle:
//       "Plaid Plush Slippers Women's Indoor Plush Home Slippers Soft Sole Thick Non-Slip Warm House Shoes Couple Autumn And Winter",
//     customerName: "Shreya",
//     productReview: "Such an incredible product",
//     customerEmail: "shreyam@gluelabs.com",
//   },
// ];

export default function Moderation() {
  const {
    data: { records: reviews, publishedCount, pendingCount },
    isLoading: isLoading,
  } = useAppQuery({
    url: "/api/review/getAllReviews",
    reactQueryOptions: {
      onSuccess: () => {},
    },
  });

  return (
    <Page fullWidth>
      <TitleBar title={"Reviews"} />
      <Layout>
        {isLoading ? (
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
        ) : reviews && reviews.length === 0 ? (
          <Layout.Section>
            <LegacyCard sectioned>
              <EmptyState
                heading="No Reviews Found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>
                  All the reviews and ratings will be shown here. You can
                  publish reviews, reply to reviews and manage reviews as well.
                </p>
              </EmptyState>
            </LegacyCard>
          </Layout.Section>
        ) : (
          <Layout.Section>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <Card>
                    <div style={{ padding: "10px" }}>
                      <Tag>Status Pending:</Tag>
                      <p
                        style={{
                          fontSize: "20px",
                          paddingTop: "4px",
                          paddingLeft: "4px",
                        }}
                      >
                        {pendingCount} reviews
                      </p>
                    </div>
                  </Card>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <Card>
                    <div style={{ padding: "10px" }}>
                      <Tag>Status Published:</Tag>
                      <p
                        style={{
                          fontSize: "20px",
                          paddingTop: "4px",
                          paddingLeft: "4px",
                        }}
                      >
                        {publishedCount} reviews
                      </p>
                    </div>
                  </Card>
                </Grid.Cell>
              </Grid>
              {reviews &&
                reviews.map((row) => (
                  <LegacyCard
                    title={
                      <div style={{ display: "flex", gap: 8 }}>
                        <Rating value={row.ratingStar} />{" "}
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                          {row.productName}
                        </span>
                      </div>
                    }
                    key={row.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        paddingBottom: "20px",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            border: "1px solid black",
                            borderRadius: "50%",
                            background: "pink",
                          }}
                        ></div>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          {row.name}
                        </span>
                        | <Tag>Product</Tag>
                        <span>{"|  December 17, 2023"}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{row.ratingMessage}</span>
                        <span style={{ color: "blue" }}>{row.email}</span>
                      </div>
                      <Input
                        multiline={3}
                        autoComplete={"off"}
                        placeholder={"Reply to the review..."}
                      />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "260px" }}>
                          <Button>
                            ChatGPT Reply &nbsp;<Tag>Coming Soon</Tag>{" "}
                          </Button>
                        </div>
                        {row.isPublished ? (
                          <span style={{ color: "green", fontWeight: "bold" }}>
                            ✅ Published
                          </span>
                        ) : (
                          <Button>Publish</Button>
                        )}
                      </div>
                    </div>
                  </LegacyCard>
                ))}
            </div>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
