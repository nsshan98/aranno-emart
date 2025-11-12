import React from "react";
import { Button } from "../atoms/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-[#7B2D26] to-[#6B1D16] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of happy customers enjoying fresh groceries delivered
            fast
          </p>
          <Button size="lg" className=" text-white text-lg px-12 py-6">
            Start Shopping Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
