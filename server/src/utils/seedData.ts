import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/Role";
import Menu from "../models/Menu";
import RoleMenu from "../models/RoleMenu";
import User from "../models/User";
import bcrypt from "bcryptjs";

dotenv.config();

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/fibank-synergy"
  )
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.log("MongoDB connection error:", err));

const seedData = async () => {
  try {
    await Role.deleteMany({});
    await Menu.deleteMany({});
    await RoleMenu.deleteMany({});

    // Roles
    const userRole = await Role.create({
      code: "user",
      name: "Regular User",
      description: "Standard user with basic access",
    });

    const adminRole = await Role.create({
      code: "admin",
      name: "Administrator",
      description: "System administrator with full access",
    });

    const companyRole = await Role.create({
      code: "company",
      name: "Company User",
      description: "User with company-specific features",
    });

    // Menus
    const homeMenu = await Menu.create({
      key: "home",
      href: "/dashboard",
      icon: "Pie",
      parentId: null,
      order: 1,
      isActive: true,
    });

    const reportsMenu = await Menu.create({
      key: "reports",
      href: "/dashboard/reports",
      icon: "Stack",
      parentId: null,
      order: 2,
      isActive: true,
    });

    const paymentsMenu = await Menu.create({
      key: "payments",
      href: "/dashboard/payments",
      icon: "Payment",
      parentId: null,
      order: 3,
      isActive: true,
    });

    const statementsMenu = await Menu.create({
      key: "statements",
      href: "/dashboard/statements",
      icon: "Withdraw",
      parentId: null,
      order: 4,
      isActive: true,
    });

    const accountsMenu = await Menu.create({
      key: "accounts",
      href: "/dashboard/accounts",
      icon: "List",
      parentId: null,
      order: 5,
      isActive: true,
    });

    const depositsMenu = await Menu.create({
      key: "deposits",
      href: "/dashboard/deposits",
      icon: "Deposit",
      parentId: null,
      order: 6,
      isActive: true,
    });

    const cardsMenu = await Menu.create({
      key: "cards",
      href: "/dashboard/cards",
      icon: "Card",
      parentId: null,
      order: 7,
      isActive: true,
    });

    const signTransfersMenu = await Menu.create({
      key: "signTransfers",
      href: "/dashboard/sign-transfers",
      icon: "Pen",
      parentId: null,
      order: 8,
      isActive: true,
    });

    const documentsMenu = await Menu.create({
      key: "documents",
      href: "/dashboard/documents",
      icon: "DocumentsSign",
      parentId: null,
      order: 9,
      isActive: true,
    });

    const servicesMenu = await Menu.create({
      key: "services",
      href: "/dashboard/services",
      icon: "Letter",
      parentId: null,
      order: 10,
      isActive: true,
    });

    const utilitiesMenu = await Menu.create({
      key: "utilities",
      href: "/dashboard/utilities",
      icon: "Book",
      parentId: null,
      order: 11,
      isActive: true,
    });

    const declarationsMenu = await Menu.create({
      key: "declarations",
      href: "/dashboard/declarations",
      icon: "Documents",
      parentId: null,
      order: 12,
      isActive: true,
    });

    // Submenus
    const posTransactionsByGroupsMenu = await Menu.create({
      key: "posTransactionsByGroups",
      href: "/dashboard/reports/pos-transactions-by-groups",
      icon: null,
      parentId: reportsMenu._id,
      order: 1,
      isActive: true,
    });

    const posTransactionsByPeriodMenu = await Menu.create({
      key: "posTransactionsByPeriod",
      href: "/dashboard/reports/pos-transactions-by-period",
      icon: null,
      parentId: reportsMenu._id,
      order: 2,
      isActive: true,
    });

    const balancesAllAccountsMenu = await Menu.create({
      key: "balancesAllAccounts",
      href: "/dashboard/reports/balances-all-accounts",
      icon: null,
      parentId: reportsMenu._id,
      order: 3,
      isActive: true,
    });

    const dailyReportBudgetMenu = await Menu.create({
      key: "dailyReportBudget",
      href: "/dashboard/reports/daily-report-budget",
      icon: null,
      parentId: reportsMenu._id,
      order: 4,
      isActive: true,
    });

    const servicesPerformedMenu = await Menu.create({
      key: "servicesPerformed",
      href: "/dashboard/reports/services-performed",
      icon: null,
      parentId: reportsMenu._id,
      order: 5,
      isActive: true,
    });

    const smsNotificationsMenu = await Menu.create({
      key: "smsNotifications",
      href: "/dashboard/reports/sms-notifications",
      icon: null,
      parentId: reportsMenu._id,
      order: 6,
      isActive: true,
    });

    const feesAmountsDueMenu = await Menu.create({
      key: "feesAmountsDue",
      href: "/dashboard/reports/fees-amounts-due",
      icon: null,
      parentId: reportsMenu._id,
      order: 7,
      isActive: true,
    });

    const swiftTransfersMenu = await Menu.create({
      key: "swiftTransfers",
      href: "/dashboard/reports/swift-transfers",
      icon: null,
      parentId: reportsMenu._id,
      order: 8,
      isActive: true,
    });

    const sessionsMenu = await Menu.create({
      key: "sessions",
      href: "/dashboard/reports/sessions",
      icon: null,
      parentId: reportsMenu._id,
      order: 9,
      isActive: true,
    });

    const newCreditTransferMenu = await Menu.create({
      key: "newCreditTransfer",
      href: "/dashboard/payments/credit-transfer",
      icon: null,
      parentId: paymentsMenu._id,
      order: 1,
      isActive: true,
    });

    const budgetPaymentMenu = await Menu.create({
      key: "budgetPayment",
      href: "/dashboard/payments/budget",
      icon: null,
      parentId: paymentsMenu._id,
      order: 2,
      isActive: true,
    });

    const directDebitMenu = await Menu.create({
      key: "directDebit",
      href: "/dashboard/payments/direct-debit",
      icon: null,
      parentId: paymentsMenu._id,
      order: 3,
      isActive: true,
    });

    const massTransferMenu = await Menu.create({
      key: "massTransfer",
      href: "/dashboard/payments/mass-transfer",
      icon: null,
      parentId: paymentsMenu._id,
      order: 4,
      isActive: true,
    });

    const fileTransfersMenu = await Menu.create({
      key: "fileTransfers",
      href: "/dashboard/payments/file-transfers",
      icon: null,
      parentId: paymentsMenu._id,
      order: 5,
      isActive: true,
    });

    const newPeriodicTransferMenu = await Menu.create({
      key: "newPeriodicTransfer",
      href: "/dashboard/payments/periodic-transfer",
      icon: null,
      parentId: paymentsMenu._id,
      order: 6,
      isActive: true,
    });

    const sebraPaymentsMenu = await Menu.create({
      key: "sebraPayments",
      href: "/dashboard/payments/sebra",
      icon: null,
      parentId: paymentsMenu._id,
      order: 7,
      isActive: true,
    });

    const creditTransferCYMenu = await Menu.create({
      key: "creditTransferCY",
      href: "/dashboard/payments/credit-transfer-cy",
      icon: null,
      parentId: paymentsMenu._id,
      order: 8,
      isActive: true,
    });

    const internalTransferCYMenu = await Menu.create({
      key: "internalTransferCY",
      href: "/dashboard/payments/internal-transfer-cy",
      icon: null,
      parentId: paymentsMenu._id,
      order: 9,
      isActive: true,
    });

    const currencyExchangeMenu = await Menu.create({
      key: "currencyExchange",
      href: "/dashboard/payments/currency-exchange",
      icon: null,
      parentId: paymentsMenu._id,
      order: 10,
      isActive: true,
    });

    const rateNegotiationMenu = await Menu.create({
      key: "rateNegotiation",
      href: "/dashboard/payments/rate-negotiation",
      icon: null,
      parentId: paymentsMenu._id,
      order: 11,
      isActive: true,
    });

    const periodicTransfersRegisterMenu = await Menu.create({
      key: "periodicTransfersRegister",
      href: "/dashboard/payments/periodic-transfers-register",
      icon: null,
      parentId: paymentsMenu._id,
      order: 12,
      isActive: true,
    });

    const transferRecipientsMenu = await Menu.create({
      key: "transferRecipients",
      href: "/dashboard/payments/transfer-recipients",
      icon: null,
      parentId: paymentsMenu._id,
      order: 13,
      isActive: true,
    });

    const accountStatementMenu = await Menu.create({
      key: "accountStatement",
      href: "/dashboard/statements/account",
      icon: null,
      parentId: statementsMenu._id,
      order: 1,
      isActive: true,
    });

    const creditCardStatementMenu = await Menu.create({
      key: "creditCardStatement",
      href: "/dashboard/statements/credit-card",
      icon: null,
      parentId: statementsMenu._id,
      order: 2,
      isActive: true,
    });

    const accountReportsByEmailMenu = await Menu.create({
      key: "accountReportsByEmail",
      href: "/dashboard/services/account-reports-email",
      icon: null,
      parentId: servicesMenu._id,
      order: 1,
      isActive: true,
    });

    const cardStatementsByEmailMenu = await Menu.create({
      key: "cardStatementsByEmail",
      href: "/dashboard/services/card-statements-email",
      icon: null,
      parentId: servicesMenu._id,
      order: 2,
      isActive: true,
    });

    const cardAuthorizationsByEmailMenu = await Menu.create({
      key: "cardAuthorizationsByEmail",
      href: "/dashboard/services/card-authorizations-email",
      icon: null,
      parentId: servicesMenu._id,
      order: 3,
      isActive: true,
    });

    const swiftTransfersByEmailMenu = await Menu.create({
      key: "swiftTransfersByEmail",
      href: "/dashboard/services/swift-transfers-email",
      icon: null,
      parentId: servicesMenu._id,
      order: 4,
      isActive: true,
    });

    const noiDeclarationMenu = await Menu.create({
      key: "noiDeclaration",
      href: "/dashboard/declarations/noi",
      icon: null,
      parentId: declarationsMenu._id,
      order: 1,
      isActive: true,
    });

    const statisticalForm100kMenu = await Menu.create({
      key: "statisticalForm100k",
      href: "/dashboard/declarations/statistical-form-100k",
      icon: null,
      parentId: declarationsMenu._id,
      order: 2,
      isActive: true,
    });

    const fundsOriginDeclarationMenu = await Menu.create({
      key: "fundsOriginDeclaration",
      href: "/dashboard/declarations/funds-origin",
      icon: null,
      parentId: declarationsMenu._id,
      order: 3,
      isActive: true,
    });

    const crossBorderTransfersDeclarationMenu = await Menu.create({
      key: "crossBorderTransfersDeclaration",
      href: "/dashboard/declarations/cross-border-transfers",
      icon: null,
      parentId: declarationsMenu._id,
      order: 4,
      isActive: true,
    });

    const pendingPaymentsMenu = await Menu.create({
      key: "pendingPayments",
      href: "/dashboard/utilities/pending-payments",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 1,
      isActive: true,
    });

    const payObligationsMenu = await Menu.create({
      key: "payObligations",
      href: "/dashboard/utilities/pay-obligations",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 2,
      isActive: true,
    });

    const municipalTaxesMenu = await Menu.create({
      key: "municipalTaxes",
      href: "/dashboard/utilities/municipal-taxes",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 3,
      isActive: true,
    });

    const oneTimePaymentMenu = await Menu.create({
      key: "oneTimePayment",
      href: "/dashboard/utilities/one-time-payment",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 4,
      isActive: true,
    });

    const addSubscriptionAccountMenu = await Menu.create({
      key: "addSubscriptionAccount",
      href: "/dashboard/utilities/add-subscription-account",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 5,
      isActive: true,
    });

    const registeredSubscriptionAccountsMenu = await Menu.create({
      key: "registeredSubscriptionAccounts",
      href: "/dashboard/utilities/registered-subscription-accounts",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 6,
      isActive: true,
    });

    const emailNotificationsMenu = await Menu.create({
      key: "emailNotifications",
      href: "/dashboard/utilities/email-notifications",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 7,
      isActive: true,
    });

    const paymentHistoryMenu = await Menu.create({
      key: "paymentHistory",
      href: "/dashboard/utilities/payment-history",
      icon: null,
      parentId: utilitiesMenu._id,
      order: 8,
      isActive: true,
    });

    // Assign menus to roles
    const allMenus = [
      homeMenu,
      reportsMenu,
      paymentsMenu,
      statementsMenu,
      accountsMenu,
      depositsMenu,
      cardsMenu,
      signTransfersMenu,
      documentsMenu,
      servicesMenu,
      utilitiesMenu,
      declarationsMenu,
      posTransactionsByGroupsMenu,
      posTransactionsByPeriodMenu,
      balancesAllAccountsMenu,
      dailyReportBudgetMenu,
      servicesPerformedMenu,
      smsNotificationsMenu,
      feesAmountsDueMenu,
      swiftTransfersMenu,
      sessionsMenu,
      newCreditTransferMenu,
      budgetPaymentMenu,
      directDebitMenu,
      massTransferMenu,
      fileTransfersMenu,
      newPeriodicTransferMenu,
      sebraPaymentsMenu,
      creditTransferCYMenu,
      internalTransferCYMenu,
      currencyExchangeMenu,
      rateNegotiationMenu,
      periodicTransfersRegisterMenu,
      transferRecipientsMenu,
      accountStatementMenu,
      creditCardStatementMenu,
      accountReportsByEmailMenu,
      cardStatementsByEmailMenu,
      cardAuthorizationsByEmailMenu,
      swiftTransfersByEmailMenu,
      noiDeclarationMenu,
      statisticalForm100kMenu,
      fundsOriginDeclarationMenu,
      crossBorderTransfersDeclarationMenu,
      pendingPaymentsMenu,
      payObligationsMenu,
      municipalTaxesMenu,
      oneTimePaymentMenu,
      addSubscriptionAccountMenu,
      registeredSubscriptionAccountsMenu,
      emailNotificationsMenu,
      paymentHistoryMenu,
    ];

    for (const menu of allMenus) {
      await RoleMenu.create({
        roleId: adminRole._id,
        menuId: menu._id,
      });
    }

    const userMenus = [
      homeMenu,
      statementsMenu,
      accountsMenu,
      cardsMenu,
      depositsMenu,
      paymentsMenu,
      newCreditTransferMenu,
      budgetPaymentMenu,
      directDebitMenu,
      massTransferMenu,
      fileTransfersMenu,
      newPeriodicTransferMenu,
      sebraPaymentsMenu,
      creditTransferCYMenu,
      internalTransferCYMenu,
      currencyExchangeMenu,
      rateNegotiationMenu,
      periodicTransfersRegisterMenu,
      transferRecipientsMenu,
      accountStatementMenu,
      creditCardStatementMenu,
    ];

    for (const menu of userMenus) {
      await RoleMenu.create({
        roleId: userRole._id,
        menuId: menu._id,
      });
    }

    const companyMenus = [
      homeMenu,
      paymentsMenu,
      statementsMenu,
      accountsMenu,
      signTransfersMenu,
      documentsMenu,
      servicesMenu,
      newCreditTransferMenu,
      budgetPaymentMenu,
      directDebitMenu,
      massTransferMenu,
      fileTransfersMenu,
      newPeriodicTransferMenu,
      sebraPaymentsMenu,
      creditTransferCYMenu,
      internalTransferCYMenu,
      currencyExchangeMenu,
      rateNegotiationMenu,
      periodicTransfersRegisterMenu,
      transferRecipientsMenu,
      accountStatementMenu,
      creditCardStatementMenu,
      accountReportsByEmailMenu,
      cardStatementsByEmailMenu,
      cardAuthorizationsByEmailMenu,
      swiftTransfersByEmailMenu,
      noiDeclarationMenu,
      statisticalForm100kMenu,
      fundsOriginDeclarationMenu,
      crossBorderTransfersDeclarationMenu,
      pendingPaymentsMenu,
      payObligationsMenu,
      municipalTaxesMenu,
      oneTimePaymentMenu,
      addSubscriptionAccountMenu,
      registeredSubscriptionAccountsMenu,
      emailNotificationsMenu,
      paymentHistoryMenu,
    ];

    for (const menu of companyMenus) {
      await RoleMenu.create({
        roleId: companyRole._id,
        menuId: menu._id,
      });
    }

    // Users
    const passwordHash = await bcrypt.hash("Test123!", 10);

    await User.deleteMany({ username: /^test/ });

    await User.create({
      uin: "7501011234",
      uinForeigner: null,
      nameCyrillic: "Админ Тестов",
      nameLatin: "Admin Testov",
      email: "testadmin@example.com",
      phoneNumber: "+359 88 765 4321",
      address: "бул. Витоша 89, София, 1000",
      username: "testadmin",
      password: passwordHash,
      role: adminRole._id,
    });

    await User.create({
      uin: "8412129874",
      uinForeigner: "A23456789",
      nameCyrillic: "Потребител Тестов",
      nameLatin: "User Testov",
      email: "testuser@example.com",
      phoneNumber: "+359 88 123 4567",
      address: "ул. Граф Игнатиев 18, София, 1000",
      username: "testuser",
      password: passwordHash,
      role: userRole._id,
    });

    await User.create({
      uin: "9009021234",
      uinForeigner: null,
      nameCyrillic: "Фирма Тестова",
      nameLatin: "Company Testov",
      email: "testcompany@example.com",
      phoneNumber: "+359 89 876 5432",
      address: "ул. Раковски 56, София, 1000",
      username: "testcompany",
      password: passwordHash,
      role: companyRole._id,
    });

    console.log("Seed data created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
