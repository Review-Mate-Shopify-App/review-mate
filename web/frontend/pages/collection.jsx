import { Page, Layout, LegacyCard, EmptyState } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function ReviewCollection() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar
        title={t("ReviewCollection.title")}
        primaryAction={{
          content: t("ReviewCollection.newReviewRequest"),
          onAction: () => console.log("Primary action"),
        }}
      />
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <EmptyState
              heading="No Review Requests"
              action={{
                content: "New Request",
                onAction: () => console.log("Primary action"),
              }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>
                Your review requests will show up here. You can send review
                email, view reviews, send review replies and publish your
                reviews here.
              </p>
            </EmptyState>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
