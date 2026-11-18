import { useState, type FormEvent, type ChangeEvent } from "react";
import { X, Upload } from "lucide-react";
import type { Product } from "../../service/product";
import uploadMedia from "../../utils/mediaUpload";
import toast from "react-hot-toast";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Omit<Product, "_id" | "id">) => Promise<void>;
  nextCatalogNumber?: string;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  nextCatalogNumber = "N° 06",
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    number: nextCatalogNumber,
    name: "",
    brand: "LUXERA",
    category: "Men" as "Men" | "Women" | "Unisex",
    suitability: "Both" as "Day" | "Evening" | "Both",
    function: "All Functions" as
      | "Wedding"
      | "Date Nights"
      | "Office"
      | "Parties"
      | "All Functions",
    concentration: "Eau de Parfum",
    volume: "100ml",
    price: 18500,
    stock: 50,
    description: "",
    batch: "Batch 2026",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    setIsSubmitting(true);
    let imageUrl = "/assets/perfumes/default-bottle.png";

    if (imageFile) {
      try {
        imageUrl = await uploadMedia(imageFile);
        toast.success("Product image uploaded successfully");
      } catch (error) {
        console.warn("Image upload fallback:", error);
      }
    }

    try {
      const productPayload: Omit<Product, "_id" | "id"> = {
        number: formData.number.trim() || nextCatalogNumber,
        name: formData.name.trim(),
        brand: formData.brand.trim() || "LUXERA",
        category: formData.category,
        suitability: formData.suitability,
        function: formData.function,
        concentration: formData.concentration.trim() || "Eau de Parfum",
        volume: formData.volume.trim() || "100ml",
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        description: formData.description.trim() || "Authentic fine fragrance.",
        batch: formData.batch.trim() || "Batch 2026",
        image: imageUrl,
      };

      await onAddProduct(productPayload);
      onClose();
    } catch {
      toast.error("Could not save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8F6F27] font-bold">
              Atelier Commission
            </span>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">
              Register New Fragrance
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Catalog Number *
              </label>
              <input
                type="text"
                required
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm font-mono outline-none focus:border-black transition-colors"
                placeholder="e.g. N° 06"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Fragrance Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
                placeholder="e.g. Afnan 9PM"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Brand *
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
                placeholder="e.g. Afnan"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Batch Code *
              </label>
              <input
                type="text"
                required
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
                placeholder="e.g. Batch 2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-gray-100 py-4 my-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e: any) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors cursor-pointer"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Suitability *
              </label>
              <select
                value={formData.suitability}
                onChange={(e: any) =>
                  setFormData({ ...formData, suitability: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors cursor-pointer"
              >
                <option value="Day">Day</option>
                <option value="Evening">Evening</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Function *
              </label>
              <select
                value={formData.function}
                onChange={(e: any) =>
                  setFormData({ ...formData, function: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors cursor-pointer"
              >
                <option value="Wedding">Wedding</option>
                <option value="Date Nights">Date Nights</option>
                <option value="Office">Office</option>
                <option value="Parties">Parties</option>
                <option value="All Functions">All Functions</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Concentration *
              </label>
              <input
                type="text"
                required
                value={formData.concentration}
                onChange={(e) =>
                  setFormData({ ...formData, concentration: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
                placeholder="e.g. Eau de Parfum"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Volume *
              </label>
              <input
                type="text"
                required
                value={formData.volume}
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
                placeholder="e.g. 100ml"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Price (Rs.) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Initial Stock *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Description *
            </label>
            <textarea
              value={formData.description}
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm outline-none focus:border-black transition-colors"
              placeholder="Detailed fragrance profile and sillage notes..."
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Upload Bottle Photo
            </label>
            <div className="flex items-center gap-3 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-gray-500" />
              <input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) setImageFile(e.target.files[0]);
                }}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white cursor-pointer hover:file:bg-gray-800 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-black hover:bg-gray-800 text-white text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register Flacon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
