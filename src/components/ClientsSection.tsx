const clients = [
  "Microsoft", "Google", "Samsung", "LG", "Epson",
  "HP", "Dell", "Lenovo", "BenQ", "ViewSonic",
];

const ClientsSection = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <h3 className="font-display text-center text-2xl font-bold text-foreground">
          Trusted by Leading Brands
        </h3>
      </div>
      <div className="relative">
        <div className="flex animate-scroll-logos whitespace-nowrap">
          {[...clients, ...clients].map((name, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center min-w-[180px] h-16 mx-4 px-8 border border-border rounded-lg text-muted-foreground font-semibold text-lg select-none"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
