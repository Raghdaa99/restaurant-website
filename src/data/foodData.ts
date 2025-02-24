import type { Food } from "@/types/food";

export const foodItems: Food[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description:
      "A classic Italian masterpiece featuring a thin, crispy crust topped with San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, and a drizzle of extra virgin olive oil. Each pizza is baked to perfection in our wood-fired oven, creating the perfect balance of flavors and textures that transport you straight to Naples.",
    price: 14.99,
    image: "/src/assets/images/foods/pizza.jpeg",
    category: "Pizza",
    prepTime: "20-25 minutes",
    calories: "266 kcal",
  },
  {
    id: 2,
    name: "Caesar Salad",
    description:
      "Our signature Caesar salad features crisp hearts of romaine lettuce, house-made garlic croutons, and shaved Parmigiano-Reggiano cheese. Tossed in our creamy Caesar dressing made from scratch with fresh garlic, anchovy paste, Dijon mustard, and extra virgin olive oil. Optional grilled chicken or shrimp available to make it a complete meal.",
    price: 8.99,
    image: "/src/assets/images/foods/salad.jpeg",
    category: "Salad",
    prepTime: "10-15 minutes",
    calories: "320 kcal",
  },
  {
    id: 3,
    name: "Cordon Bleu",
    description:
      "A sophisticated French classic featuring tender chicken breast, carefully butterflied and stuffed with premium Black Forest ham and melted Gruyère cheese. Hand-breaded in seasoned panko crumbs and pan-fried until golden brown. Served with our velvety Dijon cream sauce, roasted fingerling potatoes, and seasonal vegetables.",
    price: 14.99,
    image: "/src/assets/images/foods/cordon-bleu.jpeg",
    category: "Main Course",
    prepTime: "25-30 minutes",
    calories: "520 kcal",
  },
  {
    id: 4,
    name: "Mediterranean Salad",
    description:
      "A refreshing blend of crisp romaine lettuce, cherry tomatoes, cucumber, red onions, Kalamata olives, and crumbled feta cheese. Topped with our house-made Greek vinaigrette featuring extra virgin olive oil, red wine vinegar, and Mediterranean herbs. Served with warm pita bread and tzatziki sauce on the side.",
    price: 8.99,
    image: "/src/assets/images/foods/mediterranean-salad.jpeg",
    category: "Salad",
    prepTime: "10-15 minutes",
    calories: "280 kcal",
  },
];

export const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "/src/assets/images/categories/pizza.jpeg",
  },
  {
    id: 2,
    name: "Salad",
    image: "/src/assets/images/categories/salad.jpeg",
  },
  {
    id: 3,
    name: "Dessert",
    image: "/src/assets/images/categories/dessert.jpeg",
  },
  {
    id: 4,
    name: "Drinks",
    image: "/src/assets/images/categories/drinks.jpeg",
  },
  {
    id: 5,
    name: "Appetizers",
    image: "/src/assets/images/categories/appetizers.jpeg",
  },
];
