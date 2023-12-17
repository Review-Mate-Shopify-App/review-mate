import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  DataTable,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import Rating from "../components/shared/Rating";
import { useAppQuery } from "../hooks";

export default function Customers() {
  const { t } = useTranslation();

  const { data: customers, isLoading: loadingCustomers } = useAppQuery({
    url: "/api/review/getAllCustomers",
    reactQueryOptions: {
      onSuccess: () => {},
    },
  });

  return (
    <Page fullWidth>
      <TitleBar title={"Customers"} />
      <Layout>
        {loadingCustomers ? (
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
        ) : customers && customers.length === 0 ? (
          <Layout.Section>
            <LegacyCard sectioned>
              <EmptyState
                heading="No Customers Found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>
                  The customers who have reviewed your products will be added
                  here.
                </p>
              </EmptyState>
            </LegacyCard>
          </Layout.Section>
        ) : (
          <Layout.Section>
            <LegacyCard>
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "numeric",
                  "numeric",
                  "numeric",
                ]}
                headings={[
                  <div style={{ fontWeight: "bold" }}>Name</div>,
                  <span style={{ fontWeight: "bold" }}>Email</span>,
                  <span style={{ fontWeight: "bold" }}>Reviews</span>,
                  // <span style={{ fontWeight: "bold" }}>Rating</span>,
                  // <span style={{ fontWeight: "bold" }}>Review Requests</span>,
                ]}
                rows={
                  customers &&
                  customers.map((customer) => {
                    return [
                      customer.name,
                      customer.email,
                      1,
                      // <div
                      //   style={{
                      //     display: "flex",
                      //     justifyContent: "end",
                      //     gap: 8,
                      //   }}
                      // >
                      //   <Rating value={3} />
                      //   <span>{3}</span>
                      // </div>,
                      // 3,
                    ];
                  })
                }
                footerContent={`Showing ${customers && customers.length} of ${
                  customers && customers.length
                } results`}
              />
            </LegacyCard>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
