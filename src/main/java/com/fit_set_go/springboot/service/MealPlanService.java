package com.fit_set_go.springboot.service;

import com.fit_set_go.springboot.model.*;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.layout.*;
import com.itextpdf.layout.element.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.List;

@Service
public class MealPlanService {

    public byte[] plainTextToPdf(String text) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf);

            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            doc.setFont(font);
            doc.add(new Paragraph("Fit Set Go").setFontSize(16));   //heading of pdf
            doc.add(new Paragraph(text));

            doc.close();
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to create PDF from text", e);
        }
    }

}
