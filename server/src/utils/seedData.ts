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

    // Sub-menus
    const domesticPaymentMenu = await Menu.create({
      key: "domesticPayment",
      href: "/dashboard/payments/domestic",
      icon: "Payment",
      parentId: paymentsMenu._id,
      order: 1,
      isActive: true,
    });

    const internationalPaymentMenu = await Menu.create({
      key: "internationalPayment",
      href: "/dashboard/payments/international",
      icon: "Globe",
      parentId: paymentsMenu._id,
      order: 2,
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
      domesticPaymentMenu,
      internationalPaymentMenu,
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
      domesticPaymentMenu,
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
      domesticPaymentMenu,
      internationalPaymentMenu,
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
