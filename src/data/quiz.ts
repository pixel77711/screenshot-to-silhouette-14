export type Question = {
  q: string;
  options: string[];
  answer: number;
  explanation: string; // documented fact
  tip?: string; // interpretation / study tip
  source: string;
};

export type Topic = {
  id: string;
  domain: string;
  title: string;
  summary: string;
  minutes: number;
  questions: Question[];
};

const L = "https://learn.microsoft.com/en-us/training/";

export const topics: Topic[] = [
  {
    id: "cloud-computing",
    domain: "Cloud concepts",
    title: "What is cloud computing",
    summary: "Shared responsibility, cloud models, and consumption-based pricing.",
    minutes: 10,
    questions: [
      {
        q: "In the shared responsibility model, which item is ALWAYS the customer's responsibility?",
        options: ["Physical datacenter security", "Information and data", "Physical network", "Physical hosts"],
        answer: 1,
        explanation: "Regardless of deployment type, the customer always owns their information and data, devices, and accounts and identities. Microsoft always owns the physical datacenter, network, and hosts.",
        tip: "A quick way to remember: if you created it or you log in with it, it's yours.",
        source: L + "modules/describe-cloud-compute/3-describe-shared-responsibility-model",
      },
      {
        q: "Which cloud model combines a private cloud with public cloud resources?",
        options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
        answer: 2,
        explanation: "A hybrid cloud uses both public and private clouds in an interconnected environment, letting you choose where workloads run.",
        source: L + "modules/describe-cloud-compute/4-define-cloud-models",
      },
      {
        q: "What does the consumption-based model mean?",
        options: ["You pay upfront for capacity", "You pay only for the IT resources you use", "You pay a fixed monthly fee", "Resources are free under a limit"],
        answer: 1,
        explanation: "With the consumption-based model you have no upfront costs and pay only for what you use. This is operational expenditure (OpEx).",
        source: L + "modules/describe-cloud-compute/5-describe-consumption-based-model",
      },
      {
        q: "Which Azure service lets you manage on-premises and multi-cloud servers from Azure?",
        options: ["Azure Arc", "Azure Advisor", "Azure Monitor", "Azure Policy"],
        answer: 0,
        explanation: "Azure Arc extends Azure management to resources outside Azure, including on-premises and other clouds.",
        source: L + "modules/describe-cloud-compute/4-define-cloud-models",
      },
      {
        q: "Buying servers for your own datacenter is an example of…",
        options: ["Operational expenditure (OpEx)", "Capital expenditure (CapEx)", "Serverless pricing", "Reserved capacity"],
        answer: 1,
        explanation: "CapEx is a one-time, upfront spend on physical infrastructure. Cloud spending is usually OpEx: you pay for services as you use them.",
        source: L + "modules/describe-cloud-compute/5-describe-consumption-based-model",
      },
    ],
  },
  {
    id: "cloud-benefits",
    domain: "Cloud concepts",
    title: "Benefits of the cloud",
    summary: "High availability, scalability, reliability, security, and manageability.",
    minutes: 10,
    questions: [
      {
        q: "Adding more virtual machines to handle increased load is called…",
        options: ["Vertical scaling", "Horizontal scaling", "High availability", "Predictability"],
        answer: 1,
        explanation: "Horizontal scaling adds or removes instances. Vertical scaling adds capability (CPU, RAM) to an existing instance.",
        tip: "Horizontal = more machines side by side. Vertical = a bigger machine.",
        source: L + "modules/describe-benefits-use-cloud-services/3-describe-scalability",
      },
      {
        q: "What does an SLA (service-level agreement) describe?",
        options: ["The price of a service", "Guaranteed uptime and performance commitments", "Data residency rules", "Support ticket priorities"],
        answer: 1,
        explanation: "An SLA is a formal agreement describing Microsoft's commitments for a service's uptime and connectivity, often expressed as a percentage like 99.9%.",
        source: L + "modules/describe-benefits-use-cloud-services/2-describe-high-availability",
      },
      {
        q: "Elasticity in the cloud means…",
        options: ["Resources scale automatically with demand", "Costs never change", "Data is always encrypted", "Apps never fail"],
        answer: 0,
        explanation: "Elasticity is the ability to automatically add or remove resources as demand changes, so you're not over- or under-provisioned.",
        source: L + "modules/describe-benefits-use-cloud-services/3-describe-scalability",
      },
      {
        q: "Which benefit is about forecasting costs and performance with confidence?",
        options: ["Reliability", "Predictability", "Governance", "Manageability"],
        answer: 1,
        explanation: "Predictability covers both performance predictability (autoscaling, load balancing) and cost predictability (tools like the Pricing Calculator and TCO Calculator).",
        source: L + "modules/describe-benefits-use-cloud-services/5-describe-predictability",
      },
      {
        q: "Managing cloud resources through templates and automation is 'management ___ the cloud'.",
        options: ["of", "in", "around", "under"],
        answer: 0,
        explanation: "Management OF the cloud means managing resources (automatic scaling, templates, monitoring). Management IN the cloud refers to how you do it: portal, CLI, APIs, PowerShell.",
        source: L + "modules/describe-benefits-use-cloud-services/7-describe-manageability",
      },
    ],
  },
  {
    id: "service-types",
    domain: "Cloud concepts",
    title: "Cloud service types",
    summary: "IaaS, PaaS, and SaaS, and who manages what.",
    minutes: 10,
    questions: [
      {
        q: "Which service type gives the customer the MOST control over the operating system?",
        options: ["SaaS", "PaaS", "IaaS", "Serverless"],
        answer: 2,
        explanation: "IaaS gives you the most control: the provider manages hardware and networking, while you manage the OS, middleware, and apps.",
        source: L + "modules/describe-cloud-service-types/2-describe-infrastructure-service",
      },
      {
        q: "Microsoft 365 email is an example of…",
        options: ["IaaS", "PaaS", "SaaS", "Hybrid"],
        answer: 2,
        explanation: "SaaS delivers a fully developed application. The customer is mainly responsible for their data, devices, and user access.",
        source: L + "modules/describe-cloud-service-types/4-describe-software-service",
      },
      {
        q: "A developer wants to deploy code without managing the OS or patching. Best fit?",
        options: ["IaaS", "PaaS", "On-premises", "Private cloud"],
        answer: 1,
        explanation: "With PaaS the provider maintains the infrastructure and OS. You focus on your application and data.",
        source: L + "modules/describe-cloud-service-types/3-describe-platform-service",
      },
      {
        q: "Lift-and-shift migration of existing VMs to the cloud is most associated with…",
        options: ["SaaS", "PaaS", "IaaS", "Serverless"],
        answer: 2,
        explanation: "Lift-and-shift moves existing workloads as-is onto cloud VMs, which is a classic IaaS scenario.",
        source: L + "modules/describe-cloud-service-types/2-describe-infrastructure-service",
      },
    ],
  },
  {
    id: "architecture",
    domain: "Azure architecture & services",
    title: "Core architectural components",
    summary: "Regions, availability zones, resource groups, and subscriptions.",
    minutes: 12,
    questions: [
      {
        q: "What is an availability zone?",
        options: ["A group of regions", "A physically separate datacenter (or group) within a region", "A resource group", "A paired region"],
        answer: 1,
        explanation: "Availability zones are physically separate datacenters within an Azure region, each with independent power, cooling, and networking.",
        source: L + "modules/describe-core-architectural-components-of-azure/3-availability-zones",
      },
      {
        q: "What is the correct order of the Azure resource hierarchy, from top to bottom?",
        options: [
          "Subscriptions → Management groups → Resource groups → Resources",
          "Management groups → Subscriptions → Resource groups → Resources",
          "Resource groups → Subscriptions → Resources → Management groups",
          "Resources → Resource groups → Management groups → Subscriptions",
        ],
        answer: 1,
        explanation: "Management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain resources.",
        source: L + "modules/describe-core-architectural-components-of-azure/5-describe-azure-management-infrastructure",
      },
      {
        q: "Can a resource belong to more than one resource group?",
        options: ["Yes, up to three", "Yes, unlimited", "No, exactly one", "Only in paired regions"],
        answer: 2,
        explanation: "Each resource can be in only one resource group at a time. Resource groups can't be nested.",
        source: L + "modules/describe-core-architectural-components-of-azure/5-describe-azure-management-infrastructure",
      },
      {
        q: "Deleting a resource group does what to the resources inside it?",
        options: ["Moves them to a default group", "Deletes them all", "Nothing", "Archives them for 30 days"],
        answer: 1,
        explanation: "Actions on a resource group apply to everything inside. Deleting the group deletes all its resources.",
        tip: "That's why grouping by lifecycle (things you'd delete together) is a common best practice.",
        source: L + "modules/describe-core-architectural-components-of-azure/5-describe-azure-management-infrastructure",
      },
      {
        q: "Why do most Azure regions have a paired region?",
        options: ["For lower prices", "For disaster recovery across geography", "For faster DNS", "To meet licensing rules"],
        answer: 1,
        explanation: "Region pairs are at least 300 miles apart when possible, so an outage in one region can be recovered in the other.",
        source: L + "modules/describe-core-architectural-components-of-azure/4-azure-regions",
      },
    ],
  },
  {
    id: "compute-networking",
    domain: "Azure architecture & services",
    title: "Compute, networking & storage",
    summary: "VMs, containers, Functions, VNets, and storage redundancy.",
    minutes: 15,
    questions: [
      {
        q: "Which service runs code in response to events without managing servers?",
        options: ["Azure Virtual Machines", "Azure Functions", "Azure Virtual Desktop", "Azure VPN Gateway"],
        answer: 1,
        explanation: "Azure Functions is an event-driven, serverless compute option. It scales automatically and you pay only for execution time.",
        source: L + "modules/describe-azure-compute-networking-services/6-functions",
      },
      {
        q: "Which service creates a dedicated private connection from on-premises to Azure that does NOT go over the public internet?",
        options: ["VPN Gateway", "ExpressRoute", "Azure DNS", "VNet peering"],
        answer: 1,
        explanation: "ExpressRoute uses a private connection through a connectivity provider. A VPN Gateway sends encrypted traffic over the public internet.",
        source: L + "modules/describe-azure-compute-networking-services/10-express-route",
      },
      {
        q: "Which storage redundancy keeps 3 copies in one datacenter only?",
        options: ["LRS", "ZRS", "GRS", "GZRS"],
        answer: 0,
        explanation: "Locally redundant storage (LRS) replicates data three times within a single datacenter. It's the lowest-cost option with the least durability.",
        source: L + "modules/describe-azure-storage-services/3-redundancy",
      },
      {
        q: "Which blob access tier is cheapest to store but has the highest retrieval latency?",
        options: ["Hot", "Cool", "Cold", "Archive"],
        answer: 3,
        explanation: "The Archive tier is offline storage with the lowest storage cost; retrieving data can take hours.",
        source: L + "modules/describe-azure-storage-services/2-accounts",
      },
      {
        q: "Which tool is best for moving large amounts of data offline using a physical device?",
        options: ["AzCopy", "Azure Storage Explorer", "Azure Data Box", "Azure File Sync"],
        answer: 2,
        explanation: "Azure Data Box is a physical device Microsoft ships to you for transferring terabytes of data when network transfer isn't practical.",
        source: L + "modules/describe-azure-storage-services/5-migration-options",
      },
    ],
  },
  {
    id: "identity-security",
    domain: "Azure architecture & services",
    title: "Identity, access & security",
    summary: "Microsoft Entra ID, MFA, Zero Trust, and defense in depth.",
    minutes: 12,
    questions: [
      {
        q: "What is Microsoft Entra ID?",
        options: ["A firewall", "A cloud-based identity and access management service", "A VM image", "A storage tier"],
        answer: 1,
        explanation: "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud identity service for authentication and authorization.",
        source: L + "modules/describe-azure-identity-access-security/2-directory-services",
      },
      {
        q: "Which principle does Zero Trust follow?",
        options: ["Trust the corporate network", "Assume breach and verify explicitly", "Trust devices after first login", "Only protect the perimeter"],
        answer: 1,
        explanation: "Zero Trust's principles are: verify explicitly, use least-privilege access, and assume breach.",
        source: L + "modules/describe-azure-identity-access-security/6-zero-trust-model",
      },
      {
        q: "Role-based access control (RBAC) is best described as…",
        options: ["Granting permissions based on assigned roles", "Encrypting data at rest", "Blocking IP addresses", "Monitoring costs"],
        answer: 0,
        explanation: "Azure RBAC assigns roles to users, groups, or apps at a scope (management group, subscription, resource group, or resource).",
        tip: "Assign the least privilege needed for the job.",
        source: L + "modules/describe-azure-identity-access-security/5-azure-role-based-access-control",
      },
      {
        q: "Which service gives a unified view of security posture and threat protection across Azure and hybrid workloads?",
        options: ["Microsoft Defender for Cloud", "Azure Advisor", "Azure Arc", "Azure Policy"],
        answer: 0,
        explanation: "Microsoft Defender for Cloud is a monitoring and posture management tool that provides security recommendations and threat protection.",
        source: L + "modules/describe-azure-identity-access-security/8-defender-for-cloud",
      },
    ],
  },
  {
    id: "cost-governance",
    domain: "Management & governance",
    title: "Cost management & governance",
    summary: "Pricing tools, tags, Azure Policy, resource locks, and Purview.",
    minutes: 12,
    questions: [
      {
        q: "Which tool compares the cost of running on-premises versus in Azure?",
        options: ["Pricing calculator", "TCO calculator", "Azure Advisor", "Cost Management alerts"],
        answer: 1,
        explanation: "The Total Cost of Ownership (TCO) calculator compares on-premises infrastructure costs to Azure. The Pricing calculator estimates the cost of Azure services you plan to use.",
        source: L + "modules/describe-cost-management-azure/3-compare-pricing-total-cost-of-ownership-calculators",
      },
      {
        q: "What are resource tags primarily used for?",
        options: ["Encrypting resources", "Adding metadata like cost center or environment", "Preventing deletion", "Setting SLAs"],
        answer: 1,
        explanation: "Tags are name/value pairs that help organize resources, for example for cost reporting, ownership, or automation.",
        source: L + "modules/describe-cost-management-azure/5-describe-purpose-of-tags",
      },
      {
        q: "Which feature prevents a resource from being accidentally deleted, even by an owner?",
        options: ["Azure Policy", "Resource lock (CanNotDelete)", "RBAC Reader role", "Tags"],
        answer: 1,
        explanation: "Resource locks (Delete or ReadOnly) apply regardless of RBAC permissions. A lock must be removed before the protected action can happen.",
        source: L + "modules/describe-features-tools-azure-for-governance-compliance/4-describe-purpose-of-resource-locks",
      },
      {
        q: "Which service lets you enforce rules like 'only allow VMs in West Europe'?",
        options: ["Azure Policy", "Azure Monitor", "Azure Blueprints only", "Microsoft Purview"],
        answer: 0,
        explanation: "Azure Policy creates, assigns, and manages rules that resources must follow, and can audit or deny non-compliant resources.",
        source: L + "modules/describe-features-tools-azure-for-governance-compliance/3-describe-azure-policy",
      },
    ],
  },
  {
    id: "monitoring-tools",
    domain: "Management & governance",
    title: "Deployment & monitoring tools",
    summary: "Portal, CLI, ARM templates, Advisor, Service Health, and Monitor.",
    minutes: 10,
    questions: [
      {
        q: "Which service gives personalized recommendations for cost, security, reliability, and performance?",
        options: ["Azure Advisor", "Azure Service Health", "Azure Monitor", "Azure Arc"],
        answer: 0,
        explanation: "Azure Advisor evaluates your resources and suggests improvements across reliability, security, performance, operational excellence, and cost.",
        source: L + "modules/describe-monitoring-tools-azure/2-describe-purpose-of-azure-advisor",
      },
      {
        q: "ARM templates and Bicep are examples of…",
        options: ["Infrastructure as code", "Serverless compute", "Storage tiers", "Identity providers"],
        answer: 0,
        explanation: "ARM templates (JSON) and Bicep are declarative infrastructure-as-code tools for repeatable deployments.",
        source: L + "modules/describe-features-tools-manage-deploy-azure-resources/5-describe-azure-resource-manager-azure-arm-templates",
      },
      {
        q: "Where would you check whether an Azure outage is affecting YOUR resources?",
        options: ["Azure Service Health", "Pricing calculator", "Microsoft Purview", "Azure DNS"],
        answer: 0,
        explanation: "Azure Service Health combines Azure status, service health, and resource health to show issues that affect your specific resources.",
        source: L + "modules/describe-monitoring-tools-azure/3-describe-azure-service-health",
      },
      {
        q: "Which tool is browser-based and supports both Bash and PowerShell?",
        options: ["Azure Cloud Shell", "Azure Arc", "Azure Advisor", "Azure Storage Explorer"],
        answer: 0,
        explanation: "Azure Cloud Shell runs in the browser, needs no local install, and supports Azure CLI (Bash) and Azure PowerShell.",
        source: L + "modules/describe-features-tools-manage-deploy-azure-resources/2-describe-tools-interacting-azure",
      },
    ],
  },
];

export const domains = Array.from(new Set(topics.map((t) => t.domain)));
export const getTopic = (id: string) => topics.find((t) => t.id === id);
