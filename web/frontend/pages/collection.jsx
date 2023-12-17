import {
  Page,
  Layout,
  LegacyCard,
  EmptyState,
  DataTable,
  Spinner,
  Tag,
  Avatar,
  Badge,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Rating from "../components/shared/Rating";
import { useAppQuery } from "../hooks";
import NewReviewRequest from "../components/NewReviewRequest";

export default function ReviewCollection() {
  const { t } = useTranslation();
  const [isNewRequestFormOpen, setIsNewRequestFormOpen] = useState(false);

  //All reviews
  const {
    data: reviewRequests,
    isLoading: loadingReviews,
    refetch: refetchReviews,
    isRefetching: isRefetchingReviews,
  } = useAppQuery({
    url: "/api/review/getAllReviewsRequest",
    reactQueryOptions: {
      onSuccess: ({ data }) => {},
    },
  });

  return (
    <Page fullWidth>
      <TitleBar
        title={
          isNewRequestFormOpen
            ? "New Review Request"
            : t("ReviewCollection.title")
        }
        primaryAction={{
          content: t("ReviewCollection.newReviewRequest"),
          onAction: () => setIsNewRequestFormOpen(true),
        }}
      />
      <Layout>
        {isNewRequestFormOpen ? (
          <Layout.Section>
            <NewReviewRequest
              isOpen={isNewRequestFormOpen}
              setIsOpen={setIsNewRequestFormOpen}
              refetchReviews={refetchReviews}
            />
          </Layout.Section>
        ) : loadingReviews || isRefetchingReviews ? (
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
        ) : !reviewRequests ||
          (reviewRequests && reviewRequests.length === 0) ? (
          <Layout.Section>
            <LegacyCard sectioned>
              <EmptyState
                heading="No Review Requests"
                action={{
                  content: "New Request",
                  onAction: () => setIsNewRequestFormOpen(true),
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
        ) : (
          <Layout.Section>
            <LegacyCard>
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={[
                  <div style={{ fontWeight: "bold" }}>Products</div>,
                  <span style={{ fontWeight: "bold" }}>Customer</span>,
                  <span style={{ fontWeight: "bold" }}>Rating</span>,
                  <span style={{ fontWeight: "bold" }}>Feedback</span>,
                  <span style={{ fontWeight: "bold" }}>Status</span>,
                ]}
                rows={reviewRequests.map((reviewRequest) => {
                  return [
                    reviewRequest.productName,
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          initials={reviewRequest.name[0]}
                          size="extraSmall"
                        />
                        <span
                          style={{ fontWeight: "bold", paddingLeft: "6px" }}
                        >
                          {reviewRequest.name}
                        </span>
                      </div>
                      <span style={{ color: "blue" }}>
                        {reviewRequest.email}
                      </span>
                    </div>,
                    reviewRequest.isReviewed ? (
                      <Rating value={reviewRequest.ratingStar} />
                    ) : (
                      <Tag>Not reviewed yet</Tag>
                    ),
                    reviewRequest.ratingMessage,
                    reviewRequest.isPublished ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ✅ Published
                      </span>
                    ) : (
                      <Badge>Pending</Badge>
                    ),
                  ];
                })}
                footerContent={`Showing ${
                  reviewRequests && reviewRequests.length
                } of ${reviewRequests && reviewRequests.length} results`}
              />
            </LegacyCard>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
