import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


// Mock data for testing
const mockEvents = [
  {
    title: "World Economic Forum",
    description: "Oeuvre à la coopération entre le secteur public et le privé.",
    date: "2022-02-29T20:28:45.744Z",
    cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
  },
  {
    title: "World Gaming Day",
    description: "Événement mondial autour du gaming.",
    date: "2022-03-29T20:28:45.744Z",
    cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
  },
  {
    title: "World Farming Day",
    description: "Événement mondial autour de la ferme.",
    date: "2022-01-29T20:28:45.744Z",
    cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
  },
];

const mockPeople = [
  {
    name: "John Doe",
    position: "Speaker",
    imageSrc: "/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png",
  },
  {
    name: "Jane Smith",
    position: "Organizer",
    imageSrc: "/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png",
  },
];

const mockFooter = {
  lastEvent: mockEvents[mockEvents.length - 1],
  contactInfo: {
    address: "45 avenue de la République, 75000 Paris",
    phone: "01 23 45 67 89",
    email: "contact@724events.com",
  },
};

jest.mock("../../contexts/DataContext", () => ({
  useData: jest.fn(),
}));

describe("When a page is created", () => {
  beforeEach(() => {
    useData.mockReturnValue({ data: { events: mockEvents } });
  });

  it("a list of events is displayed", async () => {
    render(<Page />);
    // Check if event titles are displayed
    await screen.findByText("World Economic Forum");
    await screen.findByText("World Gaming Day");
    await screen.findByText("World Farming Day");
  });

  it("a list of people is displayed", async () => {
    render(<Page />);
    // Check if people names are displayed
    await screen.findByText("John Doe");
    await screen.findByText("Jane Smith");
  });

  it("a footer is displayed", async () => {
    render(<Page />);
    // Check if footer elements are displayed
    await screen.findByText("Notre dernière prestation");
    await screen.findByText("45 avenue de la République, 75000 Paris");
    await screen.findByText("01 23 45 67 89");
    await screen.findByText("contact@724events.com");
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Page />);
    // Check if last event details are displayed
    const lastEvent = mockFooter.lastEvent;
    await screen.findByText(lastEvent.title);
    await screen.findByText(lastEvent.description);
  });
});
