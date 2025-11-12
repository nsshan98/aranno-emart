import React from "react";
import { Button } from "../atoms/button";
import { ArrowRight, Truck } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div>
      <section
        id="home"
        className="relative bg-gradient-to-br from-[#7B2D26] via-[#8B3A30] to-[#6B1D16] text-white py-20 md:py-32"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Truck className="h-5 w-5 text-[#E97B2F]" />
                <span className="text-sm">
                  Get Free Delivery On Your First Order
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                We deliver <span className="text-[#E97B2F]">groceries</span>
                <br />
                to your doorstep
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-xl">
                Get the freshest groceries delivered right to your home. Save
                time, skip the lines, and enjoy the convenience of quick,
                efficient delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#E97B2F] hover:bg-[#D66A20] text-white text-lg px-8 py-6"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#7B2D26] text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-white/80">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E97B2F]/20 to-transparent rounded-full blur-3xl"></div>
                <Image
                  src="https://placehold.co/600x700/7B2D26/white?text=Fresh+Groceries"
                  alt="Delivery person with groceries"
                  width={600}
                  height={700}
                  className="relative z-10 rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
