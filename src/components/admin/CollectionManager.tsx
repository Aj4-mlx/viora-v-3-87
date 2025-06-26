import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Image, Save, X, MoveUp, MoveDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Collection {
    id: string;
    name: string;
    description: string;
    theme: string;
    image_url: string;
    is_featured: boolean;
    sort_order: number;
    created_at: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image_url: string;
    collection_ids: string[];
}

const CollectionManager = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("collections");
    const [searchTerm, setSearchTerm] = useState("");

    // Form state for new collection
    const [newCollection, setNewCollection] = useState({
        name: "",
        description: "",
        theme: "",
        image_url: "",
        is_featured: false
    });

    // Form state for editing collection
    const [editCollection, setEditCollection] = useState<Collection | null>(null);

    useEffect(() => {
        fetchCollections();
        fetchProducts();
    }, []);

    const fetchCollections = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("collections")
                .select("*")
                .order("sort_order", { ascending: true });

            if (error) throw error;
            setCollections(data || []);
        } catch (error: any) {
            toast.error("Error loading collections: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("id, name, price, category, image_url, collection_ids");

            if (error) throw error;
            setProducts(data || []);
        } catch (error: any) {
            toast.error("Error loading products: " + error.message);
        }
    };

    const handleAddCollection = async () => {
        try {
            // Get the highest sort_order
            const maxSortOrder = collections.reduce(
                (max, collection) => Math.max(max, collection.sort_order || 0),
                0
            );

            const { data, error } = await supabase
                .from("collections")
                .insert({
                    ...newCollection,
                    sort_order: maxSortOrder + 1
                })
                .select();

            if (error) throw error;

            toast.success("Collection added successfully!");
            setCollections([...collections, data[0]]);
            setIsAddDialogOpen(false);
            setNewCollection({
                name: "",
                description: "",
                theme: "",
                image_url: "",
                is_featured: false
            });
        } catch (error: any) {
            toast.error("Error adding collection: " + error.message);
        }
    };

    const handleEditCollection = async () => {
        if (!editCollection) return;

        try {
            const { error } = await supabase
                .from("collections")
                .update({
                    name: editCollection.name,
                    description: editCollection.description,
                    theme: editCollection.theme,
                    image_url: editCollection.image_url,
                    is_featured: editCollection.is_featured
                })
                .eq("id", editCollection.id);

            if (error) throw error;

            toast.success("Collection updated successfully!");
            fetchCollections(); // Refresh the collections list
            setIsEditDialogOpen(false);
            setEditCollection(null);
        } catch (error: any) {
            toast.error("Error updating collection: " + error.message);
        }
    };

    const handleDeleteCollection = async (id: string) => {
        if (!confirm("Are you sure you want to delete this collection?")) return;

        try {
            const { error } = await supabase
                .from("collections")
                .delete()
                .eq("id", id);

            if (error) throw error;

            toast.success("Collection deleted successfully!");
            setCollections(collections.filter(collection => collection.id !== id));
        } catch (error: any) {
            toast.error("Error deleting collection: " + error.message);
        }
    };

    const handleMoveCollection = async (id: string, direction: "up" | "down") => {
        const index = collections.findIndex(c => c.id === id);
        if (
            (direction === "up" && index === 0) ||
            (direction === "down" && index === collections.length - 1)
        ) {
            return; // Can't move further in this direction
        }

        const swapIndex = direction === "up" ? index - 1 : index + 1;
        const currentCollection = collections[index];
        const swapCollection = collections[swapIndex];

        try {
            // Update the sort_order of both collections
            const { error: error1 } = await supabase
                .from("collections")
                .update({ sort_order: swapCollection.sort_order })
                .eq("id", currentCollection.id);

            const { error: error2 } = await supabase
                .from("collections")
                .update({ sort_order: currentCollection.sort_order })
                .eq("id", swapCollection.id);

            if (error1) throw error1;
            if (error2) throw error2;

            toast.success("Collection order updated!");
            fetchCollections(); // Refresh the collections list
        } catch (error: any) {
            toast.error("Error updating collection order: " + error.message);
        }
    };

    const handleSelectCollection = (collection: Collection) => {
        setSelectedCollection(collection);
        setActiveTab("products");
    };

    const handleToggleProductInCollection = async (productId: string) => {
        if (!selectedCollection) return;

        try {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const isInCollection = product.collection_ids?.includes(selectedCollection.id);
            let updatedCollectionIds = [...(product.collection_ids || [])];

            if (isInCollection) {
                // Remove from collection
                updatedCollectionIds = updatedCollectionIds.filter(id => id !== selectedCollection.id);
            } else {
                // Add to collection
                updatedCollectionIds.push(selectedCollection.id);
            }

            const { error } = await supabase
                .from("products")
                .update({ collection_ids: updatedCollectionIds })
                .eq("id", productId);

            if (error) throw error;

            // Update local state
            setProducts(
                products.map(p =>
                    p.id === productId
                        ? { ...p, collection_ids: updatedCollectionIds }
                        : p
                )
            );

            toast.success(
                isInCollection
                    ? "Product removed from collection"
                    : "Product added to collection"
            );
        } catch (error: any) {
            toast.error("Error updating product collections: " + error.message);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                    <TabsTrigger value="products" disabled={!selectedCollection}>
                        Products in {selectedCollection?.name || "Collection"}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="collections">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Manage Collections</CardTitle>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Collection
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Collection</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Collection Name</Label>
                                            <Input
                                                id="name"
                                                value={newCollection.name}
                                                onChange={e =>
                                                    setNewCollection({ ...newCollection, name: e.target.value })
                                                }
                                                placeholder="Summer Essentials"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="theme">Theme</Label>
                                            <Input
                                                id="theme"
                                                value={newCollection.theme}
                                                onChange={e =>
                                                    setNewCollection({ ...newCollection, theme: e.target.value })
                                                }
                                                placeholder="Summer, Elegance, etc."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={newCollection.description}
                                                onChange={e =>
                                                    setNewCollection({
                                                        ...newCollection,
                                                        description: e.target.value
                                                    })
                                                }
                                                placeholder="Describe this collection..."
                                                rows={3}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="image_url">Image URL</Label>
                                            <Input
                                                id="image_url"
                                                value={newCollection.image_url}
                                                onChange={e =>
                                                    setNewCollection({
                                                        ...newCollection,
                                                        image_url: e.target.value
                                                    })
                                                }
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="is_featured"
                                                checked={newCollection.is_featured}
                                                onCheckedChange={checked =>
                                                    setNewCollection({
                                                        ...newCollection,
                                                        is_featured: checked
                                                    })
                                                }
                                            />
                                            <Label htmlFor="is_featured">Featured Collection</Label>
                                        </div>
                                        <div className="flex justify-end space-x-2 pt-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsAddDialogOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button onClick={handleAddCollection}>Add Collection</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <p>Loading collections...</p>
                                </div>
                            ) : collections.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <p className="text-slate-500 mb-4">No collections found</p>
                                    <Button
                                        onClick={() => setIsAddDialogOpen(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Your First Collection
                                    </Button>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Theme</TableHead>
                                            <TableHead>Featured</TableHead>
                                            <TableHead>Products</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {collections.map((collection, index) => (
                                            <TableRow key={collection.id}>
                                                <TableCell className="w-24">
                                                    <div className="flex items-center space-x-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleMoveCollection(collection.id, "up")}
                                                            disabled={index === 0}
                                                        >
                                                            <MoveUp className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleMoveCollection(collection.id, "down")}
                                                            disabled={index === collections.length - 1}
                                                        >
                                                            <MoveDown className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{collection.name}</TableCell>
                                                <TableCell>{collection.theme}</TableCell>
                                                <TableCell>
                                                    {collection.is_featured ? "✓" : ""}
                                                </TableCell>
                                                <TableCell>
                                                    {products.filter(p => p.collection_ids?.includes(collection.id)).length}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleSelectCollection(collection)}
                                                        >
                                                            Manage Products
                                                        </Button>
                                                        <Dialog
                                                            open={isEditDialogOpen && editCollection?.id === collection.id}
                                                            onOpenChange={open => {
                                                                setIsEditDialogOpen(open);
                                                                if (open) {
                                                                    setEditCollection(collection);
                                                                } else {
                                                                    setEditCollection(null);
                                                                }
                                                            }}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" size="sm">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit Collection</DialogTitle>
                                                                </DialogHeader>
                                                                {editCollection && (
                                                                    <div className="space-y-4 py-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="edit-name">Collection Name</Label>
                                                                            <Input
                                                                                id="edit-name"
                                                                                value={editCollection.name}
                                                                                onChange={e =>
                                                                                    setEditCollection({
                                                                                        ...editCollection,
                                                                                        name: e.target.value
                                                                                    })
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="edit-theme">Theme</Label>
                                                                            <Input
                                                                                id="edit-theme"
                                                                                value={editCollection.theme}
                                                                                onChange={e =>
                                                                                    setEditCollection({
                                                                                        ...editCollection,
                                                                                        theme: e.target.value
                                                                                    })
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="edit-description">Description</Label>
                                                                            <Textarea
                                                                                id="edit-description"
                                                                                value={editCollection.description}
                                                                                onChange={e =>
                                                                                    setEditCollection({
                                                                                        ...editCollection,
                                                                                        description: e.target.value
                                                                                    })
                                                                                }
                                                                                rows={3}
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="edit-image_url">Image URL</Label>
                                                                            <Input
                                                                                id="edit-image_url"
                                                                                value={editCollection.image_url}
                                                                                onChange={e =>
                                                                                    setEditCollection({
                                                                                        ...editCollection,
                                                                                        image_url: e.target.value
                                                                                    })
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <Switch
                                                                                id="edit-is_featured"
                                                                                checked={editCollection.is_featured}
                                                                                onCheckedChange={checked =>
                                                                                    setEditCollection({
                                                                                        ...editCollection,
                                                                                        is_featured: checked
                                                                                    })
                                                                                }
                                                                            />
                                                                            <Label htmlFor="edit-is_featured">Featured Collection</Label>
                                                                        </div>
                                                                        <div className="flex justify-end space-x-2 pt-4">
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() => setIsEditDialogOpen(false)}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                            <Button onClick={handleEditCollection}>
                                                                                Save Changes
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDeleteCollection(collection.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="products">
                    {selectedCollection && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Products in {selectedCollection.name}</CardTitle>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                    <Button variant="outline" onClick={() => setActiveTab("collections")}>
                                        Back to Collections
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>In Collection</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProducts.map(product => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="h-10 w-10 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 bg-slate-200 flex items-center justify-center rounded">
                                                            <Image className="h-5 w-5 text-slate-400" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{product.name}</TableCell>
                                                <TableCell>{product.price.toLocaleString()} EGP</TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={product.collection_ids?.includes(selectedCollection.id)}
                                                        onCheckedChange={() => handleToggleProductInCollection(product.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CollectionManager;