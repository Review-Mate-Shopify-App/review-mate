import {
  Card,
  Page,
  Layout,
  Text,
  LegacyCard,
  Grid,
  ProgressBar,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { starImage } from "../assets";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <Page fullWidth>
      <div style={{ paddingTop: "16px", paddingBottom: "28px" }}>
        <Text variant="heading2xl" as="h2">
          {t("Dashboard.title")}
        </Text>
      </div>{" "}
      <Layout>
        {/* Header */}
        <Layout.Section>
          <Card>
            <div style={{ padding: "20px" }}>
              <Text as="h2" variant="headingLg">
                {t("Dashboard.letsStart")}
              </Text>
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
              <LegacyCard
                title={t("Dashboard.analytics.reviewRequests.title")}
                sectioned
              >
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 2, md: 2, lg: 4, xl: 4 }}>
                    <p>{t("Dashboard.analytics.reviewRequests.received")}:</p>
                    <p style={{ fontSize: "20px", paddingTop: "6px" }}>{0}</p>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 4, sm: 2, md: 2, lg: 4, xl: 4 }}>
                    <p>{t("Dashboard.analytics.reviewRequests.sent")}:</p>
                    <p style={{ fontSize: "20px", paddingTop: "6px" }}>{0}</p>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 4, sm: 2, md: 2, lg: 4, xl: 4 }}>
                    <p>{t("Dashboard.analytics.reviewRequests.scheduled")}:</p>
                    <p style={{ fontSize: "20px", paddingTop: "6px" }}>{0}</p>
                  </Grid.Cell>
                </Grid>
              </LegacyCard>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <LegacyCard
                title={t("Dashboard.analytics.productReviews.title")}
                sectioned
              >
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <p>
                      {t("Dashboard.analytics.productReviews.overallRating")}:
                    </p>
                    <div>
                      <img width={20} height={20} src={starImage} />
                      <img width={20} height={20} src={starImage} />
                      <img width={20} height={20} src={starImage} />
                      <img width={20} height={20} src={starImage} />
                      <img width={20} height={20} src={starImage} />
                    </div>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <p>{t("Dashboard.analytics.productReviews.total")}:</p>
                    <p style={{ fontSize: "20px", paddingTop: "6px" }}>{0}</p>
                  </Grid.Cell>
                </Grid>
              </LegacyCard>
            </Grid.Cell>
          </Grid>
        </Layout.Section>

        {/* Product stats */}
        <Layout.Section>
          <div style={{ paddingTop: "16px", paddingBottom: "28px" }}>
            <Text variant="headingXl" as="h3">
              {t("Dashboard.products.title")}
            </Text>
          </div>
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
        </Layout.Section>
      </Layout>
    </Page>
  );
}
