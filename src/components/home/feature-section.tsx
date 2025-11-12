import React from "react";
import { Card, CardContent } from "../atoms/card";
import { Clock, Leaf, Shield, Truck } from "lucide-react";

const FeatureSection = () => {
  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Free Delivery</h3>
                <p className="text-sm">Free delivery on your first order</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">30 Min Delivery</h3>
                <p className="text-sm">Quick delivery within 30 minutes</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fresh Products</h3>
                <p className="text-sm">Always fresh and organic</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                <p className="text-sm">100% secure transactions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
