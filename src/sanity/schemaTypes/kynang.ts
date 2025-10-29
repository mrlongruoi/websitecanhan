import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Kỹ năng",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên kỹ năng",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "AI/ML", value: "ai-ml" },
          { title: "DevOps", value: "devops" },
          { title: "Database", value: "database" },
          { title: "Mobile", value: "mobile" },
          { title: "Cloud", value: "cloud" },
          { title: "Testing", value: "testing" },
          { title: "Design", value: "design" },
          { title: "Tools", value: "tools" },
          { title: "Soft Skills", value: "soft-skills" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Cấp độ chuyên môn",
      type: "string",
      options: {
        list: [
          { title: "Dễ", value: "beginner" },
          { title: "Trung bình", value: "intermediate" },
          { title: "Cao", value: "advanced" },
          { title: "Chuyên nghiệp", value: "expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "percentage",
      title: "Tỷ lệ chuyên môn",
      type: "number",
      description: "0-100 cho các thanh tiến trình",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Số năm kinh nghiệm",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
      description: "Mã màu HEX cho badge kỹ năng (ví dụ: #61DAFB cho React)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      proficiency: "proficiency",
    },
    prepare(selection) {
      const { title, subtitle, proficiency } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${proficiency}`,
      };
    },
  },
  orderings: [
    {
      title: "Danh mục, sau đó là Tên",
      name: "categoryName",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});
