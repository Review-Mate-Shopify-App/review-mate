# Review Mate - Shopify Product Review App

## Overview
Review Mate is a Shopify app designed to collect customer feedback on products via two main methods: email-based manual reviews and automated reviews post-purchase. It also provides analytics based on product reviews and ratings.

### Key Features
- **Manual Review Collection**: 
  - Send email requests to customers for product feedback.
  - Customizable MJML email templates with automated delivery via SES.

- **Order-Based Review Collection**: 
  - Automatic review prompts sent after a purchase, integrated with Shopify’s order system.

- **Review Analytics**: 
  - Provides insights into product ratings, customer feedback, and trends.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Shopify Polaris
- **Backend**: Node.js
- **Database**: Sequelize (SQL)
- **Email**: MJML, Amazon SES
- **Deployment**: Shopify App Infrastructure

## Limitations
1. **AI Review Responses**: We planned to implement automatic replies to reviews using ChatGPT, but due to API key issues, it’s currently delayed. This will be addressed in a future release.
2. **Order-Based Review Collection**: The feature works as expected in local environments but occasionally faces issues in the development store. We're investigating and will improve stability.

## Focus Areas
- Minimal viable product with a focus on core functionality.
- Reliable review collection system over design aesthetics.

## Target Users
- Shopify store owners, e-commerce businesses, and online retailers.

## Benefits
- Streamlined review collection.
- Enhanced customer engagement and trust.
- Data-driven insights for better decision-making.


Reference: 
https://www.helpfulcrowd.com
https://apps.shopify.com/video-product-review-app?

Demo video: https://youtu.be/ASE8UxXwhAU
