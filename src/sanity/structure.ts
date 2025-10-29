import {
  AsteriskIcon,
  BookIcon,
  CaseIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentIcon,
  DocumentsIcon,
  InlineIcon,
  ProjectsIcon,
  RocketIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nội dung danh mục đầu tư")
    .items([
      // Profile (Singleton)
      S.listItem()
        .title("Hồ sơ")
        .icon(UserIcon)
        .child(
          S.document().schemaType("profile").documentId("singleton-profile")
        ),

      S.divider(),

      // Portfolio Section
      S.listItem()
        .title("Danh mục đầu tư")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Nội dung danh mục đầu tư")
            .items([
              S.listItem()
                .title("Dự án")
                .icon(ProjectsIcon)
                .schemaType("project")
                .child(S.documentTypeList("project").title("Dự án")),

              S.listItem()
                .title("Kỹ năng")
                .icon(AsteriskIcon)
                .schemaType("skill")
                .child(S.documentTypeList("skill").title("Kỹ năng")),

              S.listItem()
                .title("Dịch vụ")
                .icon(TagIcon)
                .schemaType("service")
                .child(S.documentTypeList("service").title("Dịch vụ")),
            ])
        ),

      S.divider(),

      // Professional Background
      S.listItem()
        .title("Nền tảng chuyên môn")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Nền tảng chuyên môn")
            .items([
              S.listItem()
                .title("Kinh nghiệm làm việc")
                .icon(CaseIcon)
                .schemaType("experience")
                .child(
                  S.documentTypeList("experience").title("Kinh nghiệm làm việc")
                ),

              S.listItem()
                .title("Giáo dục")
                .icon(BookIcon)
                .schemaType("education")
                .child(S.documentTypeList("education").title("Giáo dục")),

              S.listItem()
                .title("Chứng chỉ")
                .icon(DocumentIcon)
                .schemaType("certification")
                .child(S.documentTypeList("certification").title("Chứng chỉ")),

              S.listItem()
                .title("Thành tựu & Giải thưởng")
                .icon(StarIcon)
                .schemaType("achievement")
                .child(
                  S.documentTypeList("achievement").title(
                    "Thành tựu & Giải thưởng"
                  )
                ),
            ])
        ),

      S.divider(),

      // Content & Community
      S.listItem()
        .title("Nội dung & Cộng đồng")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Nội dung & Cộng đồng")
            .items([
              S.listItem()
                .title("Bài viết trên blog")
                .icon(ComposeIcon)
                .schemaType("blog")
                .child(S.documentTypeList("blog").title("Bài viết trên blog")),

              S.listItem()
                .title("Đánh giá")
                .icon(CommentIcon)
                .schemaType("testimonial")
                .child(S.documentTypeList("testimonial").title("Đánh giá")),
            ])
        ),

      S.divider(),

      // Contact Form Submissions
      S.listItem()
        .title("Nội dung biểu mẫu liên hệ")
        .icon(InlineIcon)
        .child(
          S.list()
            .title("Nội dung biểu mẫu liên hệ")
            .items([
              S.listItem()
                .title("Bài gửi mới")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("contact")
                    .title("Bài gửi mới")
                    .filter('_type == "contact" && status == "new"')
                ),

              S.listItem()
                .title("Bài gửi đã lưu")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("contact")
                    .title("Bài gửi đã lưu")
                    .filter('_type == "contact" && status == "archived"')
                ),
            ])
        ),

      S.divider(),

      // Navigation
      S.listItem()
        .title("Liên kết điều hướng")
        .icon(DocumentsIcon)
        .schemaType("navigation")
        .child(S.documentTypeList("navigation").title("Liên kết điều hướng")),

      S.divider(),

      // Site Settings (Singleton)
      S.listItem()
        .title("Cài đặt trang")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("singleton-siteSettings")
        ),
    ]);
