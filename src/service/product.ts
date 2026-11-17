import api from './api';

export interface Product {
  _id?: string;
  id?: string;
  number: string;
  name: string;
  brand: string;
  category: 'Men' | 'Women' | 'Unisex';
  suitability: 'Day' | 'Evening' | 'Both';
  function: 'Wedding' | 'Date Nights' | 'Office' | 'Parties' | 'All Functions';
  concentration: string;
  price: number;
  volume: string;
  batch: string;
  image: string;
  description: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizQuestion {
  key: string;
  title: string;
  subtitle: string;
  options: {
    val: string;
    label: string;
    desc: string;
  }[];
}

export interface ScentQuizResponse {
  matches: {
    product: Product;
    matchScore: number;
    reason: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    key: 'gender',
    title: 'Who is this fragrance for?',
    subtitle: 'Select the primary wearer preference',
    options: [
      { val: 'men', label: 'Men', desc: 'Bold masculine notes and fresh accords' },
      { val: 'women', label: 'Women', desc: 'Captivating sillage and warm floral sweetness' },
      { val: 'unisex', label: 'Unisex', desc: 'Balanced harmonies enjoyed by everyone' },
    ],
  },
  {
    key: 'time',
    title: 'When will you wear it?',
    subtitle: 'Climate and time of day determine projection',
    options: [
      { val: 'day', label: 'Daytime', desc: 'Sunlight, work environments, and light freshness' },
      { val: 'night', label: 'Night', desc: 'Evenings, intimate dinners, and special occasions' },
    ],
  },
  {
    key: 'occasion',
    title: 'What occasion is this for?',
    subtitle: 'Pick the setting where you want to leave an impression',
    options: [
      { val: 'wedding', label: 'Wedding', desc: 'Ceremonial elegance with memorable projection' },
      { val: 'date', label: 'Date Nights', desc: 'Alluring, intimate, and sophisticated' },
      { val: 'office', label: 'Office', desc: 'Clean, professional, and subtle sillage' },
      { val: 'party', label: 'Parties', desc: 'High projection that cuts through the crowd' },
    ],
  },
];

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: Omit<Product, '_id' | 'id'>): Promise<Product> => {
  const response = await api.post<Product>('/products', productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/products/${id}`);
  return response.data;
};

export const runScentQuiz = async (answers: {
  gender?: string;
  time?: string;
  occasion?: string;
}): Promise<ScentQuizResponse> => {
  const response = await api.post<ScentQuizResponse>('/products/quiz', answers);
  return response.data;
};
