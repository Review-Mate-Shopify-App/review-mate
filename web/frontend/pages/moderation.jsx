import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  Grid,
  Card,
  Tag,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";
import ReviewCard from "../components/ReviewCard";

export default function Moderation() {
  const { data: reviews, isLoading: isLoading } = useAppQuery({
    url: "/api/review/getAllReviews",
    reactQueryOptions: {
      onSuccess: () => {},
    },
  });

  return (
    <Page fullWidth>
      <TitleBar title={"Reviews"} />
      <Layout sectioned>
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
        ) : reviews && reviews.records && reviews.records.length === 0 ? (
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
                        {reviews.pendingCount} reviews
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
                        {reviews.publishedCount} reviews
                      </p>
                    </div>
                  </Card>
                </Grid.Cell>
              </Grid>
              {reviews &&
                reviews.records &&
                reviews.records.map((row) => (
                  <ReviewCard key={row.id} row={row} />
                ))}
            </div>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
