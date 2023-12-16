import { Card, Page, Layout, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const cardStyles = {
    paddingBottom: "20px",
    background: "black",
  };
  return (
    <Page fullWidth>
      <TitleBar title={t("Dashboard.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card style={cardStyles}>
            <div style={{ padding: "20px" }}>
              <Text as="h2" variant="headingLg">
                {t("Dashboard.letsStart")}
              </Text>
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section>{/* <ProductsCard /> */}</Layout.Section>
      </Layout>
    </Page>
  );
}
