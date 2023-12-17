import {
  Card,
  Page,
  Layout,
  Text,
  LegacyCard,
  Grid,
  ProgressBar,
  Tag,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { TitleBar } from "@shopify/app-bridge-react";
import Rating from "../components/shared/Rating";
import { useAppQuery } from "../hooks";

export default function Dashboard() {
  const { t } = useTranslation();

  const { data, isLoading: isLoadingCount } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {},
    },
  });

  //Review request analytics
  const { data: reviewAnalytics, isLoading: loadingReviewAnalytics } =
    useAppQuery({
      url: "/api/reviews/analytics",
      reactQueryOptions: {
        onSuccess: () => {},
      },
    });

  //Review request analytics
  const { data: productAnalytics, isLoading: loadingProductAnalytics } =
    useAppQuery({
      url: "/api/product/analytics",
      reactQueryOptions: {
        onSuccess: () => {},
      },
    });

  return (
    <Page fullWidth>
      <TitleBar title={t("Dashboard.title")} />

      <Layout>
        {/* Header */}
        <Layout.Section>
          <Card>
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Text variant="headingMd">Every Review Tells a Story...</Text>
              <Text variant="bodyLg">🫂 Build Trust</Text>
              <Text variant="bodyLg">💻 Drive Traffic</Text>
              <Text variant="bodyLg">📈 Sell More</Text>
            </div>
          </Card>
        </Layout.Section>

        {/* Analytics */}
        <Layout.Section>
          <div style={{ paddingTop: "16px", paddingBottom: "28px" }}>
            <Text variant="headingXl" as="h3">
              {t("Dashboard.analytics.title")}
            </Text>
          </div>

          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              {!loadingReviewAnalytics && reviewAnalytics && (
                <LegacyCard
                  title={t("Dashboard.analytics.reviewRequests.title")}
                  sectioned
                >
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 4, sm: 2, md: 2, lg: 4, xl: 4 }}
                    >
                      <p>{t("Dashboard.analytics.reviewRequests.received")}:</p>
                      <p style={{ fontSize: "20px", paddingTop: "6px" }}>
                        {reviewAnalytics.received}
                      </p>
                    </Grid.Cell>

                    <Grid.Cell
                      columnSpan={{ xs: 4, sm: 2, md: 2, lg: 4, xl: 4 }}
                    >
                      <p>{t("Dashboard.analytics.reviewRequests.sent")}:</p>
                      <p style={{ fontSize: "20px", paddingTop: "6px" }}>
                        {reviewAnalytics.sent}
                      </p>
                    </Grid.Cell>

                    <Grid.Cell
                      columnSpan={{ xs: 4, sm: 2, md: 2, lg: 4, xl: 4 }}
                    >
                      <p>
                        {t("Dashboard.analytics.reviewRequests.scheduled")}:
                      </p>
                      <p style={{ fontSize: "20px", paddingTop: "3px" }}>
                        <Tag>Coming soon..</Tag>
                      </p>
                    </Grid.Cell>
                  </Grid>
                </LegacyCard>
              )}
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              {!loadingProductAnalytics && productAnalytics && (
                <LegacyCard
                  title={t("Dashboard.analytics.productReviews.title")}
                  sectioned
                >
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <p>
                        {t("Dashboard.analytics.productReviews.overallRating")}:
                      </p>
                      <Rating value={productAnalytics.overallRating} />
                    </Grid.Cell>

                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <p>{t("Dashboard.analytics.productReviews.total")}:</p>
                      <p style={{ fontSize: "20px", paddingTop: "6px" }}>
                        {productAnalytics.total}
                      </p>
                    </Grid.Cell>
                  </Grid>
                </LegacyCard>
              )}
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Product stats */}
        <Layout.Section>
          <div style={{ paddingTop: "16px", paddingBottom: "28px" }}>
            {!isLoadingCount && (
              <Text variant="headingXl" as="h3">
                {t("Dashboard.products.title") + " (" + data.count + ")"}
              </Text>
            )}
          </div>
          {!loadingProductAnalytics && productAnalytics && (
            <Card>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Text variant="bodyLg" as="p" fontWeight="semibold">
                    {t("Dashboard.products.rating.5stars")}
                  </Text>
                  <div style={{ width: 225 }}>
                    <ProgressBar progress={75} tone="highlight" />
                  </div>
                  <span style={{ color: "HighlightText" }}>{75}%</span>
                </div>
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Text variant="bodyLg" as="p" fontWeight="semibold">
                    {t("Dashboard.products.rating.4stars")}
                  </Text>
                  <div style={{ width: 225 }}>
                    <ProgressBar progress={75} tone="highlight" />
                  </div>
                  <span style={{ color: "HighlightText" }}>{75}%</span>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Text variant="bodyLg" as="p" fontWeight="semibold">
                    {t("Dashboard.products.rating.3stars")}
                  </Text>
                  <div style={{ width: 225 }}>
                    <ProgressBar progress={75} tone="highlight" />
                  </div>
                  <span style={{ color: "HighlightText" }}>{75}%</span>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Text variant="bodyLg" as="p" fontWeight="semibold">
                    {t("Dashboard.products.rating.2stars")}
                  </Text>
                  <div style={{ width: 225 }}>
                    <ProgressBar progress={75} tone="highlight" />
                  </div>
                  <span style={{ color: "HighlightText" }}>{75}%</span>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Text variant="bodyLg" as="p" fontWeight="semibold">
                    {t("Dashboard.products.rating.1star")}
                  </Text>
                  <div style={{ width: 225, marginLeft: "10px" }}>
                    <ProgressBar progress={75} tone="highlight" />
                  </div>
                  <span style={{ color: "HighlightText" }}>{75}%</span>
                </div>
              </div>
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
