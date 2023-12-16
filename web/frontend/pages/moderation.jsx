import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  DataTable,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import Rating from "../components/shared/Rating";
import Input from "../components/shared/Input";

const rows = [
  {
    id: 1,
    productTitle:
      "Plaid Plush Slippers Women's Indoor Plush Home Slippers Soft Sole Thick Non-Slip Warm House Shoes Couple Autumn And Winter",
    customerName: "Shreya",
    productReview: "Such an incredible product",
    customerEmail: "shreyam@gluelabs.com",
  },
];

export default function Moderation() {
  const { t } = useTranslation();

  return (
    <Page fullWidth>
      <TitleBar title={"Reviews"} />
      <Layout>
        {rows.length === 0 ? (
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
            {rows.map((row) => (
              <LegacyCard
                title={
                  <div style={{ display: "flex", gap: 8 }}>
                    <Rating value={4} />{" "}
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {row.productTitle}
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
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
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
                      {row.customerName}
                    </span>
                    <span>{"|  December 16, 2023"}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{row.productReview}</span>
                    <span style={{ color: "blue" }}>{row.customerEmail}</span>
                  </div>
                  <Input
                    multiline={3}
                    autoComplete={"off"}
                    placeholder={"Reply to the review..."}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "160px" }}>
                      <Button>ChatGPT Reply</Button>
                    </div>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ✅ Published
                    </span>
                  </div>
                </div>
              </LegacyCard>
            ))}
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
